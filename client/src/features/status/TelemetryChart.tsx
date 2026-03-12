import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function TelemetryChart({ cpuLoad, systemStatus }: { cpuLoad: number, systemStatus: string }) {
    const [dataPoints, setDataPoints] = useState<number[]>(Array(40).fill(10));
    
    useEffect(() => {
        let intervalTime = 800;
        if (cpuLoad > 60) intervalTime = 400;
        if (cpuLoad > 85) intervalTime = 200;

        const interval = setInterval(() => {
            setDataPoints(prev => {
                const newArr = [...prev.slice(1)]; // Shift left
                
                // Determine new value based on status and load
                let newValue = 5;
                if (systemStatus === 'offline') {
                    newValue = 0;
                } else {
                    // Base noise
                    const noise = Math.random() * 20;
                    // Add CPU load influence
                    newValue = Math.max(5, (cpuLoad * Math.random() * 0.8) + noise);
                    // Cap at 100
                    newValue = Math.min(100, newValue);
                }
                
                newArr.push(newValue);
                return newArr;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [cpuLoad, systemStatus]);

    // Determine bar color based on status
    let barColor = 'bg-emerald-500';
    if (systemStatus === 'degraded') barColor = 'bg-yellow-500';
    if (systemStatus === 'offline') barColor = 'bg-red-500';

    return (
        <div className="w-full h-full flex flex-col justify-end pt-8 pb-2">
            
            {/* Y-Axis Labels & Grid Lines */}
            <div className="absolute inset-0 pointer-events-none p-4 pb-6 flex flex-col justify-between">
                <div className="border-t border-white/5 w-full h-0 relative">
                    <span className="absolute -top-3 left-0 text-[8px] text-white/20 font-mono">100ms</span>
                </div>
                <div className="border-t border-white/5 w-full h-0 relative">
                    <span className="absolute -top-3 left-0 text-[8px] text-white/20 font-mono">50ms</span>
                </div>
                <div className="border-t border-white/5 w-full h-0 relative">
                    <span className="absolute -top-3 left-0 text-[8px] text-white/20 font-mono">0ms</span>
                </div>
            </div>

            {/* The Bars */}
            <div className="flex-1 flex items-end justify-between gap-[2px] sm:gap-1 px-4 z-10 w-full overflow-hidden">
                {dataPoints.map((val, i) => {
                    // Hide the first 20 bars on mobile using CSS to keep the DOM stable but visually clean
                    const isExcessMobile = i < 20; 
                    return (
                        <motion.div
                            key={i}
                            className={`w-full rounded-t-[1px] ${barColor} ${val > 80 ? 'opacity-100 shadow-[0_0_8px_currentColor]' : 'opacity-60'} ${isExcessMobile ? 'hidden sm:block' : ''}`}
                            initial={{ height: 0 }}
                            animate={{ height: `${Math.max(2, val)}%` }}
                            transition={{ type: "tween", duration: 0.2 }}
                        />
                    );
                })}
            </div>

            {/* X-Axis Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#08080a] to-transparent pointer-events-none z-20"></div>
        </div>
    );
}
