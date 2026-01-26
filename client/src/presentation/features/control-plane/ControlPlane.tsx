import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemConfig } from '@application/hooks/useSystemConfig';
import { useSystemMeta } from '@application/hooks/useSystemMeta';

export function ControlPlane() {
    const { config, setDebugMode, setTrafficLevel, setSimMode } = useSystemConfig();
    const { meta, loading } = useSystemMeta();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className="w-full max-w-4xl pointer-events-auto">
                {/* Header / Toggle Handle */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-[#0f1117] border-t border-x border-orange-500/30 text-orange-500 font-mono text-[10px] uppercase tracking-widest py-1 hover:bg-orange-950/20 transition-colors flex justify-between px-4 rounded-t-lg backdrop-blur-md"
                >
                    <span>System_Control_Plane // {config.sim_mode.toUpperCase()}</span>
                    <span>{isOpen ? '▼ MINIMIZE' : '▲ DEPLOY'}</span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="bg-[#0f1117]/95 border-x border-b border-orange-500/30 backdrop-blur-xl overflow-hidden"
                        >
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
                                
                                {/* 1. FLIGHT DATA */}
                                <div className="space-y-4">
                                    <h4 className="text-orange-500/50 text-[10px] uppercase tracking-widest border-b border-orange-500/20 pb-1">
                                        Flight_Telemetry
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                        <div>
                                            <div className="text-slate-500 text-[10px]">COMMIT_HASH</div>
                                            <div className="text-orange-400">{meta?.commit}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-500 text-[10px]">VERSION_TAG</div>
                                            <div className="text-orange-400">{meta?.version}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-500 text-[10px]">BUILD_TIMESTAMP</div>
                                            <div className="text-slate-300">{meta?.build_time}</div>
                                        </div>
                                        <div>
                                            <div className="text-slate-500 text-[10px]">ENV_CONTEXT</div>
                                            <div className="text-slate-300">{meta?.environment.toUpperCase()}</div>
                                        </div>
                                    </div>
                                    <div className="bg-orange-500/5 p-2 rounded border border-orange-500/10 flex justify-between items-center">
                                        <div className="text-[10px] text-orange-500 animate-pulse">● SYSTEM_UPTIME</div>
                                        <div className="text-xl font-bold text-white font-mono">{Math.floor((meta?.uptime_seconds || 0) / 60)}m {((meta?.uptime_seconds || 0) % 60)}s</div>
                                    </div>
                                </div>

                                {/* 2. CONFIGURATION */}
                                <div className="space-y-4">
                                    <h4 className="text-orange-500/50 text-[10px] uppercase tracking-widest border-b border-orange-500/20 pb-1">
                                        System_Configuration
                                    </h4>
                                    
                                    <div className="space-y-3">
                                        {/* DEBUG MODE TOGGLE */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-300">VERBOSE_DEBUG_MODE</span>
                                            <button 
                                                onClick={() => setDebugMode(!config.debug_mode)}
                                                className={`w-8 h-4 rounded-full p-0.5 transition-colors ${config.debug_mode ? 'bg-orange-500' : 'bg-slate-700'}`}
                                            >
                                                <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform ${config.debug_mode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                            </button>
                                        </div>

                                        {/* TRAFFIC LEVEL SELECTOR */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-300">SIM_TRAFFIC_LEVEL</span>
                                            <div className="flex gap-1">
                                                {(['low', 'high', 'surge'] as const).map((level) => (
                                                    <button
                                                        key={level}
                                                        onClick={() => setTrafficLevel(level)}
                                                        className={`px-2 py-0.5 text-[9px] uppercase border transition-colors ${config.traffic_level === level ? 'border-orange-500 bg-orange-500/20 text-orange-400' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* SIM MODE SELECTOR */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-300">OP_MODE</span>
                                            <div className="flex gap-1">
                                                {(['standard', 'maintenance', 'offline'] as const).map((mode) => (
                                                    <button
                                                        key={mode}
                                                        onClick={() => setSimMode(mode)}
                                                        className={`px-2 py-0.5 text-[9px] uppercase border transition-colors ${config.sim_mode === mode ? 'border-red-500/50 bg-red-500/10 text-red-400' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
                                                    >
                                                        {mode}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="text-[9px] text-slate-600 pt-2 border-t border-white/5">
                                        CONFIG_CHANGES_ARE_EPHEMERAL // CLIENT_SESSION_ONLY
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
