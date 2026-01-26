import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HeroBackground() {
  interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    pulse: number;
    name: string;
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<{ x: number, y: number, name: string } | null>(null);
  const activeNodeRef = useRef<{ x: number, y: number, name: string } | null>(null);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;
    
    // Configuration
    const TOPOGRAPHY_LINES = 12;
    const NODE_COUNT = 30;

    // Node System
    const nodes = nodesRef.current;

    const techStack = [
        "GitHub Actions", "Docker", "Cloudflare", "Railway", "Render", "Heroku", "Vercel", "Netlify", "Bash", "Python", "Git",
        "Java", "JavaScript", "C#", "Dart", "HTML5", "CSS3", "Markdown",
        "Spring Boot", "Django", "Flask", "React", "Flutter", "Tailwind CSS", "Bootstrap",
        "VS Code", "Antigravity", "Figma"
    ];

    const resize = () => {
        if (!containerRef.current || !canvas) return;
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        canvas.width = width; // Standard density for performance
        canvas.height = height;
        
        // Init Nodes
        nodes.length = 0;
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 2,
                color: Math.random() > 0.5 ? '#06b6d4' : '#6366f1', // Cyan / Indigo
                pulse: Math.random() * Math.PI,
                name: techStack[Math.floor(Math.random() * techStack.length)]
            });
        }
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const drawDiamond = (x: number, y: number, size: number) => {
        ctx.beginPath();
        ctx.moveTo(x, y - size); // Top
        ctx.lineTo(x + size, y); // Right
        ctx.lineTo(x, y + size); // Bottom
        ctx.lineTo(x - size, y); // Left
        ctx.closePath();
    };

    // Packet System
    interface Packet {
        x: number;
        y: number;
        tx: number; // Target X
        ty: number; // Target Y
        speed: number;
        progress: number;
        size: number;
    }
    const packets: Packet[] = [];

    const drawCore = (centerX: number, centerY: number) => {
        // Core Glow - Restored for depth
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 350);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.1)'); // Cyan center
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)'); // Indigo mid
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 350, 0, Math.PI * 2);
        ctx.fill();

        // Rotating Rings (The "Nucleus")
        const ringCount = 3;
        for (let i = 0; i < ringCount; i++) {
            const size = 140 + i * 50; // Bigger rings
            const speed = (i % 2 === 0 ? 1 : -1) * (0.2 / (i + 1));
            
            const angle = time * speed;
            
            // Parallax: Shift rings opposing mouse to create depth
            // Inner rings move less, outer rings move more (or vice versa depending on desired effect)
            // Let's make outer rings move MORE to feel closer, inner rings static (tunnel)
            const parallaxX = (mouseX - width / 2) * (0.02 * (i + 1));
            const parallaxY = (mouseY - height / 2) * (0.02 * (i + 1));
            
            const distToMouse = Math.hypot(mouseX - centerX, mouseY - centerY);
            const glitchIntensity = Math.max(0, 300 - distToMouse) / 300 * 5; // Glitch stronger when mouse close

            // RGB Split Drawing Helper
            const drawRing = (color: string, offsetX: number, offsetY: number) => {
                ctx.save();
                // Apply Parallax Offset here
                ctx.translate(centerX + offsetX + parallaxX, centerY + offsetY + parallaxY);
                // ctx.rotate(angle); // Removed rotation to stop "wobbling"
                
                ctx.strokeStyle = color;
                ctx.lineWidth = 3; 
                ctx.lineCap = 'round';
                
                // 1. Base Ring: Dotted
                ctx.save();
                ctx.setLineDash([0, 15]); 
                // Animate the dots flowing
                ctx.lineDashOffset = -time * speed * 200; 
                
                ctx.globalAlpha = 0.4 - (i * 0.1); // Dimmer base
                ctx.beginPath();
                ctx.ellipse(0, 0, size, size * 0.8, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();

                ctx.restore();
            };

            // Draw Clean Ring (No Glitch/Glow)
            drawRing(i === 0 ? '#06b6d4' : '#6366f1', 0, 0);
            
            // Data Runner (White dot on ring)
            ctx.save();
            ctx.translate(centerX + parallaxX, centerY + parallaxY);
            // ctx.rotate(angle); // No rotation for runner container either, or it misaligns
            // We need to calculate position on the ellipse
            const runnerAngle = time * speed * 4; // Move somewhat faster
            const rx = Math.cos(runnerAngle) * size;
            const ry = Math.sin(runnerAngle) * size * 0.8;
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 1;
            drawDiamond(rx, ry, 3);
            ctx.fill();
            ctx.restore();
        }

        // Central Dense Cluster
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.8;
        drawDiamond(centerX, centerY, 10 + Math.sin(time * 2) * 2); 
        ctx.fill();
    };

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        time += 0.01;

        const centerX = width * 0.75; // Anchor Core to the right (75%)
        const centerY = height * 0.5;

        // 1. Draw Flowing Topography (Iso-lines)
        ctx.lineWidth = 1;
        for (let i = 0; i < TOPOGRAPHY_LINES; i++) {
             // ... Topography code remains same ...
             // Re-implementing Topography loop here to ensure function integrity if replaced completely
             // But trying to keep the chunk manageable. I will assume the previous topography code is fine 
             // and just replace the draw function logic.
             // WAIT - MultiReplace replaces chunks. The target content must match exactly.
             // I am targeting the drawCore function and below.
             
             // Let's re-implement the Topography loop for safety as it's small enough.
            const yBase = height * 0.2 + (i * height * 0.08); 
            const opacity = 1 - (i / TOPOGRAPHY_LINES);
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            ctx.beginPath();
            
            for (let x = 0; x <= width; x += 10) {
                const noise1 = Math.sin(x * 0.002 + time + i * 0.5);
                const noise2 = Math.cos(x * 0.01 - time * 0.5);
                const dx = x - centerX;
                const dy = yBase - centerY;
                const distToCore = Math.sqrt(dx*dx + dy*dy);
                const gravity = Math.max(0, 300 - distToCore) / 300;
                const gravityY = Math.sin(dx * 0.01) * gravity * 50; 
                const distortion = Math.max(0, 200 - Math.hypot(mouseX - x, mouseY - yBase)) / 200; 
                const yOffset = (noise1 * 20 + noise2 * 10) * (1 + i * 0.2) + (distortion * 30) + gravityY;
                
                if (x === 0) ctx.moveTo(x, yBase + yOffset);
                else ctx.lineTo(x, yBase + yOffset);
            }
            ctx.stroke();
        }

        // 1.5 Draw Core
        drawCore(centerX, centerY);


        // 2. Draw Geo-Nodes & Traffic
        ctx.lineWidth = 0.5;
        
        // Spawn Packets randomly
        if (Math.random() > 0.95) {
            const startNode = nodes[Math.floor(Math.random() * nodes.length)];
            // Target is either another node or the Core
            const targetIsCore = Math.random() > 0.5;
            packets.push({
                x: startNode.x,
                y: startNode.y,
                tx: targetIsCore ? centerX : nodes[Math.floor(Math.random() * nodes.length)].x,
                ty: targetIsCore ? centerY : nodes[Math.floor(Math.random() * nodes.length)].y,
                speed: 0.02 + Math.random() * 0.03,
                progress: 0,
                size: 1.5
            });
        }

        // Update & Draw Packets
        for (let i = packets.length - 1; i >= 0; i--) {
            const p = packets[i];
            p.progress += p.speed;
            
            const currX = p.x + (p.tx - p.x) * p.progress;
            const currY = p.y + (p.ty - p.y) * p.progress;
            
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(currX, currY, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            if (p.progress >= 1) packets.splice(i, 1);
        }
        
        nodes.forEach((node, index) => {
            // Physics
            node.x += node.vx;
            node.y += node.vy;
            node.pulse += 0.05;

            // Boundary Wrap
            if (node.x < 0) node.x = width;
            if (node.x > width) node.x = 0;
            if (node.y < 0) node.y = height;
            if (node.y > height) node.y = 0;

            // Gravity
            const dxCore = centerX - node.x;
            const dyCore = centerY - node.y;
            const distCore = Math.sqrt(dxCore*dxCore + dyCore*dyCore);
            if (distCore > 100) { 
                 node.x += dxCore * 0.0002;
                 node.y += dyCore * 0.0002;
            }

            // Mouse Avoidance
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const repel = Math.max(0, 200 - dist) / 200;
            
            node.x -= (dx/dist || 0) * repel * 2;
            node.y -= (dy/dist || 0) * repel * 2;

            // Draw Connections
            nodes.forEach((other, otherIndex) => {
                if (index <= otherIndex) return; 
                const odx = node.x - other.x;
                const ody = node.y - other.y;
                const distance = Math.sqrt(odx*odx + ody*ody);

                if (distance < 150) {
                    ctx.strokeStyle = node.color;
                    ctx.globalAlpha = (1 - distance / 150) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });

            // Hit detection for hover
            let foundNode = null;
            if (nodes.length < 100) { // Safety check
                 // Check reverse to select top node first
                 for (let i = nodes.length - 1; i >= 0; i--) {
                     const n = nodes[i];
                     const dist = Math.hypot(mouseX - n.x, mouseY - n.y);
                     if (dist < 30) { // 30px hit area
                         foundNode = { x: n.x, y: n.y, name: n.name };
                         break;
                     }
                 }
            }
            
            // Debounce/Throttle state update to avoid thrashing
            if (JSON.stringify(activeNodeRef.current) !== JSON.stringify(foundNode)) {
                activeNodeRef.current = foundNode;
                setActiveNode(foundNode);
            }

            // Draw Node
            ctx.globalAlpha = 0.8 + Math.sin(node.pulse) * 0.2;
            ctx.fillStyle = node.color;
            drawDiamond(node.x, node.y, node.size * (1 + repel)); 
            ctx.fill();
        });
        
        // Connect nodes to Core Center
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        nodes.forEach(node => {
             const dx = centerX - node.x;
             const dy = centerY - node.y;
             const dist = Math.sqrt(dx*dx + dy*dy);
             if (dist < 200) {
                 ctx.beginPath();
                 ctx.moveTo(node.x, node.y);
                 ctx.lineTo(centerX, centerY);
                 ctx.stroke();
             }
        });
        


        ctx.globalAlpha = 1;

        animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full overflow-hidden" 
        style={{
            // Subtle Vignette for full-screen depth, no hard edges
            maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)', // Simpler vignette
            background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)' // Darken corners
        }}
    >
        {/* Vignette Overlay (Optional now, given the mask, but keeps the center darker if needed) */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.8)_100%)] pointer-events-none z-10" /> */}
        
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0"
        />
        
        {/* Label Overlay - Moved to be safe from mask clipping or kept subtle */}
        <div className="absolute bottom-10 left-10 z-20 pointer-events-none opacity-80">
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-500/80 tracking-wider">LIVE MESH</span>
            </div>
        </div>

        {/* Hover Tooltip */}
        <AnimatePresence>
            {activeNode && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    style={{ 
                        left: activeNode.x, 
                        top: activeNode.y 
                    }}
                    className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-[150%]"
                >
                    <div className="px-3 py-1.5 rounded bg-black/80 border border-cyan-500/50 backdrop-blur-md text-xs font-mono text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        {activeNode.name}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
