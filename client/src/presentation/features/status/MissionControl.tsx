import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStatus } from '@application/hooks/useSystemStatus';
import { useSystemConfig } from '@application/hooks/useSystemConfig';
import { useSystemMeta } from '@application/hooks/useSystemMeta';
import { LiveHeartbeat } from './LiveHeartbeat';
import { ServiceMesh } from './ServiceMesh';
import { IncidentLog } from './IncidentLog';
import { ControlPanel } from './ControlPanel';

export function MissionControl() {
    const status = useSystemStatus();
    const { meta } = useSystemMeta();
    const { config, setDebugMode: setGlobalDebug, setTrafficLevel: setGlobalTraffic } = useSystemConfig(); // Use global config
    const [debugMode, setDebugMode] = useState(false); // Local debug view toggle (kept for view switching)
    // const [trafficLevel, setTrafficLevel] = useState<'low' | 'high'>('low'); // Removed local state, use global config

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full max-w-7xl mx-auto border border-primary/30 bg-black/60 backdrop-blur-xl rounded-sm overflow-hidden shadow-[0_0_40px_-10px_rgba(16,185,129,0.1)] flex flex-col relative"
        >
            {/* 1. CHASSIS HEADER (Bezel) */}
            <div className="h-12 border-b border-primary/20 flex items-center justify-between px-4 bg-primary/5 select-none">
                <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full ${status.status === 'offline' ? 'bg-red-500' : 'bg-red-500/20'}`}></div>
                        <div className={`w-2 h-2 rounded-full ${status.status === 'degraded' ? 'bg-yellow-500' : 'bg-yellow-500/20'}`}></div>
                        <div className={`w-2 h-2 rounded-full ${status.status === 'healthy' ? 'bg-emerald-500' : 'bg-emerald-500/20'}`}></div>
                    </div>
                    <h2 className="text-sm font-bold tracking-[0.2em] text-primary/90 uppercase">
                        System Observation Deck // <span className="text-white/50">V.2.0.4</span>
                    </h2>
                </div>
                <div className="flex items-center space-x-4 text-[10px] font-mono text-primary/60">
                    <span className={`animate-pulse ${status.status === 'healthy' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {status.status === 'healthy' ? '● LIVE FEED' : '● CONNECTION LOST'}
                    </span>
                    <span>NET: {status.cpu > 80 ? '124ms' : '12ms'}</span>
                    <span>CPU: {status.cpu}%</span>
                </div>
            </div>

            {/* 2. MAIN GRID (Interlocking Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-primary/20 min-h-[600px] bg-grid-pattern relative">
                
                {/* LEFT COLUMN (Visualizations) - Spans 8 cols */}
                <div className="lg:col-span-8 flex flex-col divide-y divide-primary/20">
                    
                    {/* TOP: HEARTBEAT */}
                    <div className="h-[250px] relative">
                         <div className="absolute top-2 left-3 z-10">
                            <h3 className="text-[10px] font-mono text-primary/50 uppercase tracking-wider border border-primary/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                Core_Heartbeat_Monitor
                            </h3>
                        </div>
                        <LiveHeartbeat cpuLoad={status.cpu} systemStatus={status.status} />
                        
                        {/* Technical Grid Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-20" 
                             style={{backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
                        </div>
                    </div>

                    {/* BOTTOM: SERVICE MESH */}
                    <div className="flex-1 relative min-h-[350px]">
                        <div className="absolute top-2 left-3 z-10 flex items-center space-x-2">
                             <h3 className="text-[10px] font-mono text-primary/50 uppercase tracking-wider border border-primary/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                Architecture_Topology
                            </h3>
                        </div>
                        <div className="w-full h-full p-4">
                            <ServiceMesh trafficLevel={config.traffic_level} />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (Log & Status) - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col bg-black/20">
                    {/* Dynamic Header */}
                    <div className="p-3 border-b border-primary/20 flex justify-between items-center bg-primary/5">
                        <span className="text-[10px] font-mono uppercase text-primary/70">
                            {debugMode ? 'Raw Telemetry Stream' : 'System Events'}
                        </span>
                        <div className={`h-1.5 w-1.5 rounded-full ${status.status === 'healthy' ? 'bg-emerald-500' : 'bg-red-500'} animate-ping`}></div>
                    </div>
                    
                    <div className="flex-1 overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            {debugMode ? (
                                <motion.div 
                                    key="debug"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="absolute inset-0 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 bg-black/50"
                                >
                                    <pre className="text-[10px] font-mono text-primary/70 whitespace-pre-wrap">
                                        {JSON.stringify({ ...status, config, timestamp: new Date().toISOString() }, null, 2)}
                                    </pre>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="log"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="absolute inset-0"
                                >
                                    <IncidentLog status={status} config={config} meta={meta} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Control Panel (Replacing Static Footer) */}
                    <ControlPanel 
                        debugMode={debugMode} 
                        setDebugMode={setDebugMode}
                        trafficLevel={config.traffic_level}
                        setTrafficLevel={setGlobalTraffic}
                    />
                </div>
            </div>
        </motion.div>
    );
}
