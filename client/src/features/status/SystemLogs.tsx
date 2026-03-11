import { useState, useEffect, useRef } from 'react';

const EVENT_TEMPLATES = [
    "INFO [AuthService] Validating JWT token signature for req_id={id}",
    "INFO [Gateway] Route match found for /api/v1/users",
    "WARN [DB_Cluster] Connection pool reaching 80% capacity",
    "INFO [Cache] Cache MISS for key: {key}",
    "INFO [Cache] Cache HIT for key: {key} (2ms)",
    "INFO [Worker] Job {job_id} completed successfully in {time}ms",
    "INFO [Edge] TLS handshake succeeded for client IP 192.168.x.x",
    "DEBUG [Kubelet] Container image footprint size: 142MB",
    "INFO [MessageQueue] Publishing event: USER_LOGIN_SUCCESS",
    "WARN [RateLimiter] Client approaching rate limit threshold",
];

const ERROR_TEMPLATES = [
    "ERROR [DB_Cluster] Connection timeout after 5000ms",
    "CRITICAL [Gateway] Upstream service unavailable (502 Bad Gateway)",
    "ERROR [AuthService] Failed to parse JWT signature: malformed payload",
    "FATAL [NodeJS] Out of memory crash near heap limit",
    "ERROR [Worker] Job {job_id} failed with exit code 1",
];

function generateLogLine(isError: boolean) {
    const templates = isError ? ERROR_TEMPLATES : EVENT_TEMPLATES;
    let template = templates[Math.floor(Math.random() * templates.length)];
    
    // Replace placeholders with fake data
    template = template.replace('{id}', Math.random().toString(36).substring(7));
    template = template.replace('{key}', `user:${Math.floor(Math.random() * 1000)}`);
    template = template.replace('{job_id}', `job_${Math.floor(Math.random() * 9999)}`);
    template = template.replace('{time}', Math.floor(Math.random() * 150).toString());
    
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${template}`;
}

export function SystemLogs({ status, debugMode }: any) {
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let intervalTime = 1000;
        let errorRate = 0.05; // 5% chance of error on healthy

        if (status.status === 'degraded') {
            intervalTime = 400; // Faster logs
            errorRate = 0.4;    // 40% errors
        } else if (status.status === 'offline') {
            intervalTime = 1500; // Slow logs
            errorRate = 0.95;   // Almost all errors
        }

        // If CPU is high, pump logs faster
        if (status.cpu > 70) intervalTime = intervalTime / 2;

        const interval = setInterval(() => {
            setLogs(prev => {
                const isError = Math.random() < errorRate;
                const newLog = generateLogLine(isError);
                const nextLogs = [...prev, newLog];
                // Keep only last 50
                if (nextLogs.length > 50) nextLogs.shift();
                return nextLogs;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [status.status, status.cpu]);

    // Auto scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    if (debugMode) {
        return (
            <div className="absolute inset-0 p-4 overflow-y-auto scrollbar-thin custom-scrollbar bg-black/80 font-mono text-[10px] text-cyan-500 whitespace-pre-wrap">
                {JSON.stringify({ status, timestamp: new Date().toISOString() }, null, 2)}
            </div>
        );
    }

    return (
        <div ref={scrollRef} className="absolute inset-0 p-4 overflow-y-auto custom-scrollbar flex flex-col justify-end">
            <div className="space-y-1 w-full">
                {logs.map((log, i) => {
                    const isError = log.includes("ERROR") || log.includes("CRITICAL") || log.includes("FATAL");
                    const isWarn = log.includes("WARN");
                    
                    let color = "text-slate-400";
                    if (isError) color = "text-red-400 font-bold bg-red-500/10 border-l-2 border-red-500 pl-2";
                    if (isWarn) color = "text-yellow-400 bg-yellow-500/10 border-l-2 border-yellow-500 pl-2";

                    return (
                        <div key={i} className={`font-mono text-[9px] md:text-[10px] break-all ${color}`}>
                            {log}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
