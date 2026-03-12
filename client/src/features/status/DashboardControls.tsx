export function DashboardControls({ debugMode, setDebugMode, trafficLevel, setTrafficLevel, simMode, setSimMode }: any) {
    return (
        <div className="h-full flex flex-col justify-between font-mono">
            <div className="space-y-6">
                
                {/* DEBUG MODE TOGGLE */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-white text-xs font-bold tracking-wider">VERBOSE TELEMETRY</div>
                        <div className="text-slate-500 text-[9px] mt-0.5 uppercase tracking-widest">Stream raw JSON overrides</div>
                    </div>
                    <button 
                        onClick={() => setDebugMode(!debugMode)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors ${debugMode ? 'bg-cyan-500' : 'bg-[#1a1c23] border border-white/10'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${debugMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </button>
                </div>

                {/* TRAFFIC LEVEL */}
                <div className="flex flex-col gap-2">
                    <div>
                        <div className="text-white text-xs font-bold tracking-wider">SIMULATED PAYLOAD</div>
                        <div className="text-slate-500 text-[9px] mt-0.5 uppercase tracking-widest">Inject synthetic request spikes</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 sm:mt-1">
                        {(['low', 'high', 'surge'] as const).map((level) => (
                            <button
                                key={level}
                                onClick={() => setTrafficLevel(level)}
                                className={`py-2.5 sm:py-1.5 min-h-[44px] sm:min-h-0 text-[10px] uppercase font-bold rounded-sm border transition-all ${trafficLevel === level ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'bg-[#0a0a0c] border-white/10 text-slate-500 hover:border-white/20 hover:text-white'}`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SIM MODE */}
                <div className="flex flex-col gap-2">
                    <div>
                        <div className="text-white text-xs font-bold tracking-wider">OPERATIONAL OVERRIDE</div>
                        <div className="text-slate-500 text-[9px] mt-0.5 uppercase tracking-widest">Force global registry status</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 sm:mt-1">
                        {(['standard', 'maintenance', 'offline'] as const).map((mode) => {
                            let activeColor = 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
                            if (mode === 'maintenance') activeColor = 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.2)]';
                            if (mode === 'offline') activeColor = 'text-red-400 border-red-500/50 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
                            
                            return (
                                <button
                                    key={mode}
                                    onClick={() => setSimMode(mode)}
                                    className={`py-2.5 sm:py-1.5 min-h-[44px] sm:min-h-0 text-[10px] uppercase font-bold rounded-sm border transition-all ${simMode === mode ? activeColor : 'bg-[#0a0a0c] border-white/10 text-slate-500 hover:border-white/20 hover:text-white'}`}
                                >
                                    {mode}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>

            <div className="text-[9px] text-slate-600 font-mono mt-6 pt-4 border-t border-white/5 uppercase tracking-widest text-center">
                Modifications are restricted to current browser session
            </div>
        </div>
    );
}
