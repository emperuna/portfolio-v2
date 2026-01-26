import { useEffect, useRef } from 'react';

export function LiveHeartbeat({ cpuLoad = 0 }: { cpuLoad?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cpuRef = useRef(cpuLoad);

    // Keep ref in sync for animation loop
    useEffect(() => {
        cpuRef.current = cpuLoad;
    }, [cpuLoad]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;
        
        // Data points for the EKG line
        const dataPoints: number[] = [];
        
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

        // EKG Generation Logic
        const generatePoint = (t: number) => {
            // Base simulated noise
            let val = Math.sin(t * 0.05) * 5 + (Math.random() - 0.5) * 2;
            
            // Dynamic Heart Rate based on CPU
            // CPU 0 -> 100 frames interval
            // CPU 100 -> 40 frames interval
            const beatInterval = 100 - (cpuRef.current * 0.5); 
            
            const positionInCycle = t % beatInterval;
            
            // Spike Logic
            if (positionInCycle > beatInterval - 15 && positionInCycle < beatInterval - 10) { // Q
                val -= 10;
            } else if (positionInCycle >= beatInterval - 10 && positionInCycle < beatInterval - 5) { // R (Spike)
                val += 60 * (1 - Math.abs(positionInCycle - (beatInterval - 7.5)) / 2.5);
            } else if (positionInCycle >= beatInterval - 5 && positionInCycle < beatInterval) { // S
                val -= 15;
            }
            return val;
        };

        const render = () => {
            // Speed factor: Higher CPU = Faster scroll
            // 1.0 base speed, up to 2.0 at max load
            const speed = 1 + (cpuRef.current / 100);
            time += speed;
            
            // Add new point
            const newData = generatePoint(time);
            dataPoints.push(newData);
            if (dataPoints.length > canvas.width / 2) { 
                dataPoints.shift();
            }

            // Clear
            ctx.fillStyle = 'rgba(0, 5, 2, 0.9)'; 
            ctx.clearRect(0, 0, canvas.width, canvas.height);

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
            const centerY = canvas.height / 2;
            ctx.beginPath();
            
            // Color shifts to Amber if load > 80
            ctx.strokeStyle = cpuRef.current > 80 ? '#fbbf24' : '#34d399';
            
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 4;
            ctx.shadowColor = cpuRef.current > 80 ? '#fbbf24' : '#34d399';

            for (let i = 0; i < dataPoints.length; i++) {
                const x = i * 2; 
                const y = centerY - dataPoints[i];
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            
            // Draw Reading Dot
            if (dataPoints.length > 0) {
                const lastX = (dataPoints.length - 1) * 2;
                const lastY = centerY - dataPoints[dataPoints.length - 1];
                
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(lastX, lastY, 2, 0, Math.PI * 2);
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
