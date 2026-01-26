import { useEffect, useRef } from 'react';

export function LiveHeartbeat({ cpuLoad = 0, systemStatus = 'healthy' }: { cpuLoad?: number; systemStatus?: 'healthy' | 'degraded' | 'offline' }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Persist waveform history without triggering re-renders
    const historyRef = useRef<number[]>([]);
    const cpuRef = useRef(cpuLoad);
    const timeRef = useRef(0);
    const lastFrameRef = useRef<number | null>(null);
    const modeRef = useRef<'healthy' | 'degraded' | 'offline'>('healthy');

    // Keep ref in sync
    useEffect(() => {
        if (cpuLoad < 0) return;
        cpuRef.current = cpuLoad;
    }, [cpuLoad]);

    useEffect(() => {
        modeRef.current = systemStatus;
    }, [systemStatus]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        
        // Resize handler
        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        window.addEventListener('resize', resize);
        resize();

        const samplesPerSecond = 60;
        const sampleStepMs = 1000 / samplesPerSecond;

        const generateSample = (sampleIndex: number, bpm: number, amplitude: number) => {
            const beatInterval = (samplesPerSecond * 60) / Math.max(40, bpm);
            const pos = sampleIndex % beatInterval;
            let val = Math.sin(sampleIndex * 0.03) * 2; // baseline undulation
            const noiseScale = modeRef.current === 'degraded' ? 2.5 : 1.2;
            val += (Math.random() - 0.5) * noiseScale; // sensor noise

            const qStart = beatInterval * 0.70;
            const qEnd = beatInterval * 0.73;
            const rEnd = beatInterval * 0.76;
            const sEnd = beatInterval * 0.80;
            const tStart = beatInterval * 0.84;
            const tEnd = beatInterval * 0.92;

            if (pos > qStart && pos <= qEnd) {
                val -= amplitude * 0.25;
            } else if (pos > qEnd && pos <= rEnd) {
                const rPeak = (qEnd + rEnd) / 2;
                const rWidth = (rEnd - qEnd) / 2;
                val += amplitude * (1 - Math.abs(pos - rPeak) / Math.max(rWidth, 1));
            } else if (pos > rEnd && pos <= sEnd) {
                val -= amplitude * 0.4;
            } else if (pos > tStart && pos <= tEnd) {
                const tPhase = (pos - tStart) / (tEnd - tStart);
                val += Math.sin(tPhase * Math.PI) * amplitude * 0.15;
            }

            return val;
        };

        const render = () => {
            const now = performance.now();
            if (lastFrameRef.current === null) {
                lastFrameRef.current = now;
            }
            const delta = now - lastFrameRef.current;
            lastFrameRef.current = now;

            const cpu = Math.max(0, Math.min(100, cpuRef.current));
            const bpm = modeRef.current === 'offline' ? 0 : (55 + cpu * 0.6); // 55-115 bpm range
            const amplitude = Math.min(canvas.height * 0.35, 18 + cpu * 0.5);

            const samplesToAdd = Math.max(1, Math.floor(delta / sampleStepMs));
            const history = historyRef.current;
            const maxPoints = Math.max(140, Math.floor(canvas.width / 2));

            for (let i = 0; i < samplesToAdd; i++) {
                timeRef.current += 1;
                if (modeRef.current === 'offline') {
                    history.push(0);
                } else {
                    history.push(generateSample(timeRef.current, bpm, amplitude));
                }
                if (history.length > maxPoints) history.shift();
            }

            // Clear
            ctx.fillStyle = 'rgba(0, 5, 2, 0.9)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Grid
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
            ctx.lineWidth = 1;
            const gridSize = 20;
            
            ctx.beginPath();
            for(let x = 0; x < canvas.width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for(let y = 0; y < canvas.height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();

            // Draw EKG Line
            const stepX = canvas.width / (history.length - 1 || 1);
            
            ctx.beginPath();
            // Color shifts based on CPU load
            const stroke = modeRef.current === 'offline' ? '#ef4444' : (cpu > 80 ? '#fbbf24' : '#34d399');
            ctx.strokeStyle = stroke;
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 4;
            ctx.shadowColor = stroke;

            for (let i = 0; i < history.length; i++) {
                const x = i * stepX;
                const val = history[i];
                const centerY = canvas.height / 2;
                const y = centerY - val;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Draw Reading Dot (Current Head)
            if (history.length > 0) {
                const lastX = (history.length - 1) * stepX;
                const centerY = canvas.height / 2;
                const lastY = centerY - history[history.length - 1];
                
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full block" />;
}
