import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';
import { mapProjectStatusToDisplay, type ProjectStatus } from '@domain';
import { StatusPill } from '../ui/StatusPill';

interface ProjectCardProps {
    title: string;
    description: string;
    status: ProjectStatus;
    tech: string[];
    link?: string;
    repoUrl?: string;
}

export function ProjectCard({ title, description, status, tech, link }: ProjectCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    
    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Calculate rotation based on mouse position relative to center
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Calculate sheen gradient position
    const sheenX = useTransform(mouseX, [-0.5, 0.5], ["-100%", "200%"]);
    const sheenY = useTransform(mouseY, [-0.5, 0.5], ["-100%", "200%"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        
        // Calculate mouse position as a percentage (-0.5 to 0.5) from the center
        const width = rect.width;
        const height = rect.height;
        
        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;
        
        const xPct = mouseXRel / width - 0.5;
        const yPct = mouseYRel / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Map internal status to StatusPill status
    return (
        <motion.div
            ref={ref}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative h-full w-full cursor-pointer perspective-1000"
            onClick={() => link && window.open(link, '_blank')}
        >
            {/* Glass Container */}
            <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:border-cyan-500/50 group-hover:bg-white/10">
                
                {/* Holographic Sheen Effect */}
                <motion.div 
                    style={{ 
                        background: `linear-gradient(105deg, transparent 40%, rgba(6, 182, 212, 0.1) 45%, rgba(255, 255, 255, 0.05) 50%, transparent 54%)`,
                        left: sheenX,
                        top: sheenY,
                        width: "200%",
                        height: "200%",
                        position: "absolute",
                        zIndex: 10,
                        pointerEvents: "none"
                    }}
                />

                {/* Scanline Overlay (On Hover) */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#06b6d410_3px)] mix-blend-overlay" />
                </div>

                {/* Content Layer (lifted off glass via transform) */}
                <div style={{ transform: "translateZ(20px)" }} className="relative z-20 flex flex-col h-full gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                            {title}
                        </h3>
                        <StatusPill status={mapProjectStatusToDisplay(status)} className="scale-90" />
                    </div>

                    {/* Description */}
                    <p className="flex-1 text-sm leading-relaxed text-blue-100/60 font-mono">
                        {description}
                    </p>

                    {/* Footer: Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {tech.map((t) => (
                            <span 
                                key={t} 
                                className="rounded bg-cyan-500/10 px-2 py-1 text-[10px] font-medium text-cyan-400 border border-cyan-500/20"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Add global styles for perspective if needed, but utility class 'perspective-1000' usually covers it in Tailwind
// If 'perspective-1000' isn't in config, we might need arbitrary value className="[perspective:1000px]"
// I'll use [perspective:1000px] to be safe if standard class missing.
