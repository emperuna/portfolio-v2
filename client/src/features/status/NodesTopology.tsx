import type { SystemHealth } from '@lib/types';

const NODES = [
    { id: 'EDGE_GATEWAY', region: 'ap-southeast-1 (Primary)', position: 'top' as const },
    { id: 'PG_CLUSTER',   region: 'Primary / Replica',   position: 'bottom-left' as const },
    { id: 'REDIS_CACHE',  region: 'L1 In-Memory',        position: 'bottom-right' as const },
];

function NodeDot({ status }: { status: SystemHealth }) {
    if (status === 'healthy') return (
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
    );
    if (status === 'degraded') return (
        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
    );
    // offline
    return <div className="w-2 h-2 rounded-full bg-red-600 opacity-70" />;
}

export function NodesTopology({ trafficLevel, systemStatus }: { trafficLevel: string, systemStatus: SystemHealth }) {
    let animSpeed = 3;
    if (trafficLevel === 'high') animSpeed = 1.5;
    if (trafficLevel === 'surge') animSpeed = 0.5;

    const isOffline = systemStatus === 'offline';

    return (
        <div className="w-full h-full p-2 md:p-4 flex flex-col justify-between relative overflow-hidden">
            {/* SVG Connection Lines */}
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
                style={{ zIndex: 0 }}
            >
                {/* Gateway to DB */}
                <path id="path1" d="M 50 20 L 25 80" stroke={isOffline ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'} strokeWidth="0.5" fill="none" strokeDasharray="1 2" />
                {!isOffline && (
                    <circle cx="0" cy="0" r="1.5" fill={systemStatus === 'degraded' ? 'rgba(234,179,8,0.8)' : 'rgba(16,185,129,0.8)'}>
                        <animateMotion dur={`${animSpeed}s`} repeatCount="indefinite">
                            <mpath href="#path1" />
                        </animateMotion>
                    </circle>
                )}

                {/* Gateway to Cache */}
                <path id="path2" d="M 50 20 L 75 80" stroke={isOffline ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'} strokeWidth="0.5" fill="none" strokeDasharray="1 2" />
                {!isOffline && (
                    <circle cx="0" cy="0" r="1.5" fill={systemStatus === 'degraded' ? 'rgba(234,179,8,0.8)' : 'rgba(16,185,129,0.8)'}>
                        <animateMotion dur={`${animSpeed}s`} repeatCount="indefinite">
                            <mpath href="#path2" />
                        </animateMotion>
                    </circle>
                )}
            </svg>

            {/* Gateway - Top */}
            <div className="flex justify-center w-full relative z-10 pt-4">
                <div className="bg-[#0a0a0c] border border-white/5 p-3 rounded-sm shadow-xl flex items-center gap-3 backdrop-blur-sm">
                    <NodeDot status={systemStatus} />
                    <div>
                        <div className="text-white text-[10px] md:text-xs font-bold tracking-wider">EDGE_GATEWAY</div>
                        <div className="text-slate-500 text-xs font-mono mt-1 tracking-wider uppercase">ap-southeast-1 (Primary)</div>
                    </div>
                </div>
            </div>

            {/* DB & Cache - Bottom */}
            <div className="flex w-full justify-between px-2 md:px-6 relative z-10 pb-4">
                <div className="bg-[#0a0a0c] border border-white/5 p-3 rounded-sm shadow-xl flex items-center gap-3 backdrop-blur-sm">
                    <NodeDot status={systemStatus} />
                    <div>
                        <div className="text-white text-[10px] md:text-xs font-bold tracking-wider">PG_CLUSTER</div>
                        <div className="text-slate-500 text-[8px] md:text-[9px] uppercase">Primary / Replica</div>
                    </div>
                </div>

                <div className="bg-[#0a0a0c] border border-white/5 p-3 rounded-sm shadow-xl flex items-center gap-3 backdrop-blur-sm">
                    <NodeDot status={systemStatus} />
                    <div>
                        <div className="text-white text-[10px] md:text-xs font-bold tracking-wider">REDIS_CACHE</div>
                        <div className="text-slate-500 text-[8px] md:text-[9px] uppercase">L1 In-Memory</div>
                    </div>
                </div>
            </div>

            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 pointer-events-none z-0 ${
                systemStatus === 'healthy' ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_60%)]' :
                systemStatus === 'degraded' ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.05)_0%,transparent_60%)]' :
                'bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.05)_0%,transparent_60%)]'
            }`}></div>
        </div>
    );
}

