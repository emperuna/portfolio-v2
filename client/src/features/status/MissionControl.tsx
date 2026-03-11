import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSystemStatus } from './useSystemStatus';
import { useSystemConfig } from './useSystemConfig';
import { useSystemMeta } from './useSystemMeta';

import { TelemetryChart } from './TelemetryChart';
import { NodesTopology } from './NodesTopology';
import { SystemLogs } from './SystemLogs';
import { DashboardControls } from './DashboardControls';

export function MissionControl() {
    const status = useSystemStatus();
    const { meta, displayUptime } = useSystemMeta();
    const { config, setDebugMode: setGlobalDebug, setTrafficLevel: setGlobalTraffic, setSimMode } = useSystemConfig();
    const [debugMode, setDebugMode] = useState(false);

    // Dynamic global status string
    let statusColor = "emerald-500";
    let statusText = "ALL SYSTEMS OPERATIONAL";
    if (status.status === 'degraded') {
        statusColor = "yellow-500";
        statusText = "SYSTEM DEGRADED";
    } else if (status.status === 'offline') {
        statusColor = "red-500";
        statusText = "SYSTEM OUTAGE";
    }

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full max-w-7xl mx-auto flex flex-col gap-6"
        >
            {/* 1. GLOBAL HEADER CARD */}
            <div className="bg-[#08080a] border border-white/5 rounded-sm p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden">
                {/* Subtle gradient glow matching status */}
                <div className={`absolute inset-0 bg-gradient-to-r from-${statusColor}/5 to-transparent pointer-events-none`}></div>
                
                <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-3 h-3 rounded-full bg-${statusColor} animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]`}></div>
                    <div>
                        <div className="text-white font-bold tracking-widest text-sm md:text-base">{statusText}</div>
                        <div className="text-slate-500 text-xs font-mono mt-1 tracking-wider uppercase">
                            REGION: AP-SOUTHEAST-1 // REGISTRY_SYNCDRONE: {status.status === 'healthy' ? 'ONLINE' : status.status === 'degraded' ? 'DEGRADED' : 'OFFLINE'}
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-6 text-xs font-mono bg-[#0a0a0c] px-6 py-3 border border-white/5 rounded-sm relative z-10 w-full md:w-auto">
                    <div className="flex flex-col flex-1 md:flex-none">
                        <span className="text-slate-500 mb-1 text-[10px]">UPTIME</span>
                        <span className="text-white font-bold">
                            {Math.floor(displayUptime / 3600) > 0 ? `${Math.floor(displayUptime / 3600)}h ` : ''}
                            {Math.floor((displayUptime % 3600) / 60)}m {displayUptime % 60}s
                        </span>
                    </div>
                    <div className="flex flex-col flex-1 md:flex-none">
                        <span className="text-slate-500 mb-1 text-[10px]">LATENCY</span>
                        <span className="text-white font-bold">{status.latency_ms > 0 ? `${status.latency_ms}ms` : '—'}</span>
                    </div>
                    <div className="flex flex-col flex-1 md:flex-none hidden sm:flex">
                        <span className="text-slate-500 mb-1 text-[10px]">VERSION</span>
                        <span className="text-white font-bold">{meta?.version || '2.0.4'}</span>
                    </div>
                </div>
            </div>

            {/* 2. BENTO GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Main Telemetry Chart (Spans 2 columns) */}
                <div className="lg:col-span-2 bg-[#08080a] border border-white/5 rounded-sm shadow-xl min-h-[340px] flex flex-col overflow-hidden relative group">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-[#0a0a0c]/50">
                        <span className="flex items-center gap-2"><svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> Active Global Requests</span>
                        <span className="text-emerald-500/50">LIVE_DATA</span>
                    </div>
                    <div className="flex-1 relative p-4">
                        <TelemetryChart cpuLoad={status.cpu} systemStatus={status.status} />
                    </div>
                </div>

                {/* Nodes Topology */}
                <div className="bg-[#08080a] border border-white/5 rounded-sm shadow-xl min-h-[340px] flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-[#0a0a0c]/50">
                        <span className="flex items-center gap-2"><svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> Edge Architecture</span>
                        <span className="text-emerald-500/50 flex flex-col justify-end items-end h-[0.7rem]"><span className="w-2 h-2 rounded-full bg-emerald-500/50 animate-ping"></span></span>
                    </div>
                    <div className="flex-1 relative p-4 bg-[#0a0a0c]/40">
                        <NodesTopology trafficLevel={config.traffic_level} systemStatus={status.status} />
                    </div>
                </div>

                {/* System Logs */}
                <div className="lg:col-span-2 bg-[#08080a] border border-white/5 rounded-sm shadow-xl min-h-[280px] flex flex-col overflow-hidden relative">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-[#0a0a0c]/80 backdrop-blur-md z-10">
                        <span className="flex items-center gap-2"><svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg> {debugMode ? 'Raw Telemetry Stream' : 'Event Traces'}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${status.status === 'healthy' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
                    </div>
                    <div className="flex-1 relative bg-black/60">
                        <SystemLogs status={status} config={config} meta={meta} debugMode={debugMode} />
                    </div>
                </div>

                {/* Dashboard Controls */}
                <div className="bg-[#08080a] border border-white/5 rounded-sm shadow-xl min-h-[280px] flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-[#0a0a0c]/50">
                        <span className="flex items-center gap-2"><svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> Configuration Panel</span>
                        <span className="text-white/20">ROOT</span>
                    </div>
                    <div className="flex-1 p-4 bg-[#0a0a0c]/40">
                        <DashboardControls 
                            debugMode={debugMode} 
                            setDebugMode={setDebugMode}
                            trafficLevel={config.traffic_level}
                            setTrafficLevel={setGlobalTraffic}
                            simMode={config.sim_mode}
                            setSimMode={setSimMode}
                        />
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
