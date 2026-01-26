import type { SystemMeta } from '@domain/entities/SystemMeta';
import { useEffect, useRef, useState } from 'react';

interface LogEntry {
    id: number;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
    message: string;
    source: string;
}

interface IncidentLogProps {
    status: {
        status: string;
        cpu: number;
        memory: number;
    };
    meta?: SystemMeta | null;
    config?: {
        sim_mode: string;
        traffic_level: string;
        debug_mode: boolean;
    };
}

export function IncidentLog({ status, config, meta }: IncidentLogProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [logs, setLogs] = useState<LogEntry[]>([
        { id: 1, timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: "System Initialized", source: "KERNEL" },
        { id: 2, timestamp: new Date().toLocaleTimeString(), level: 'SUCCESS', message: "Connected to Satellite Uplink", source: "NET" },
    ]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    // React to Status Changes (Real Data Events)
    useEffect(() => {
        const addLog = (level: LogEntry['level'], message: string, source: string) => {
            const newLog = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
                level,
                message,
                source
            };
            setLogs(prev => [...prev.slice(-19), newLog]);
        };

        // Event: High CPU
        if (status.cpu > 80) {
            addLog('WARN', `High CPU Load Detected (${status.cpu}%)`, 'CPU');
        }

        // Event: Status Change
        if (status.status !== 'healthy') {
            addLog('ERROR', `System Status: ${status.status.toUpperCase()}`, 'HEALTH');
        }

    }, [status.status, Math.floor(status.cpu / 10)]); // Debounce CPU logs by 10% buckets

    // React to Config Changes (Control Plane Events)
    useEffect(() => {
        if (!config) return;
        const addLog = (level: LogEntry['level'], message: string, source: string) => {
            setLogs(prev => [...prev.slice(-19), {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
                level,
                message,
                source
            }]);
        };

        addLog('INFO', `Traffic Level set to ${config.traffic_level.toUpperCase()}`, 'CONFIG');
        addLog('INFO', `Simulation Mode: ${config.sim_mode.toUpperCase()}`, 'CONFIG');
    }, [config?.traffic_level, config?.sim_mode]);

    // React to System Meta (Topology Events)
    useEffect(() => {
        if (!meta) return;
        const addLog = (level: LogEntry['level'], message: string, source: string) => {
            setLogs(prev => [...prev.slice(-19), {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
                level,
                message,
                source
            }]);
        };

        if (meta.commit) {
            addLog('SUCCESS', `GitHub API Linked (Commit: ${meta.commit})`, 'GITHUB');
        }
        if (meta.environment) {
            addLog('INFO', `Edge Network Active [${meta.environment.toUpperCase()}]`, 'EDGE');
        }
    }, [meta?.commit, meta?.environment]);

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
                <div key={log.id} className="flex items-baseline space-x-3 border-l border-primary/10 pl-2 hover:bg-white/5 transition-colors text-[10px] sm:text-xs">
                    <span className="text-primary/30 w-[60px] shrink-0 font-mono">{log.timestamp}</span>
                    <span className={`w-[60px] shrink-0 font-bold font-mono ${getLevelColor(log.level)}`}>{log.level}</span>
                    <span className="text-primary/50 w-[80px] shrink-0 font-mono text-right pr-2">[{log.source}]</span>
                    <span className="text-primary/90 flex-1 font-mono break-words">{log.message}</span>
                </div>
            ))}
            {/* Blinking cursor at bottom */}
            <div className="animate-pulse text-primary mt-2">_</div>
        </div>
    );
}
