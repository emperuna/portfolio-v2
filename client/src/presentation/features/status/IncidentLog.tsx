import { useEffect, useRef, useState } from 'react';

interface LogEntry {
    id: number;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
    message: string;
    source: string;
}

export function IncidentLog() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [logs, setLogs] = useState<LogEntry[]>([
        { id: 1, timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: "System Initialized", source: "KERNEL" },
        { id: 2, timestamp: new Date().toLocaleTimeString(), level: 'SUCCESS', message: "Connected to Satellite Uplink", source: "NET" },
        { id: 3, timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: "Monitoring Services Active", source: "WIDGET" },
    ]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    // Random log generation
    useEffect(() => {
        const messages = [
            { level: 'INFO', msg: "Health check routine verified", src: "HEALTH" },
            { level: 'INFO', msg: "Packet sequence acknowledged", src: "TCP/IP" },
            { level: 'WARN', msg: "Latency spike detected (24ms)", src: "M-3" },
            { level: 'SUCCESS', msg: "Cache invalidated", src: "REDIS" },
            { level: 'INFO', msg: "User session heartbeat", src: "AUTH" },
            { level: 'INFO', msg: "Render cycle completed", src: "GPU" },
        ];

        const interval = setInterval(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            const time = new Date().toLocaleTimeString();
            
            setLogs(prev => {
                const newLog = { 
                    id: Date.now(), 
                    timestamp: time, 
                    level: randomMsg.level as any, 
                    message: randomMsg.msg, 
                    source: randomMsg.src 
                };
                return [...prev.slice(-19), newLog]; // Keep last 20
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const getLevelColor = (level: string) => {
        switch(level) {
            case 'ERROR': return 'text-red-500';
            case 'WARN': return 'text-yellow-500';
            case 'SUCCESS': return 'text-emerald-400';
            default: return 'text-primary/70';
        }
    };

    return (
        <div ref={scrollRef} className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 p-2 space-y-1">
            {logs.map(log => (
                <div key={log.id} className="flex space-x-2 border-l border-primary/10 pl-2 hover:bg-white/5 transition-colors">
                    <span className="text-primary/30 min-w-[60px]">{log.timestamp}</span>
                    <span className={`min-w-[50px] font-bold ${getLevelColor(log.level)}`}>{log.level}</span>
                    <span className="text-primary/50">[{log.source}]</span>
                    <span className="text-primary/90">{log.message}</span>
                </div>
            ))}
            {/* Blinking cursor at bottom */}
            <div className="animate-pulse text-primary mt-2">_</div>
        </div>
    );
}
