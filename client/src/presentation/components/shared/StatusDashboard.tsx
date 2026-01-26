import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStatus } from '@application/hooks';

export function StatusDashboard() {
  const system = useSystemStatus();
  const [history, setHistory] = useState<{ id: number; value: number }[]>(
    Array.from({ length: 20 }).map((_, i) => ({ id: Date.now() - i * 1000, value: 20 }))
  );

  // Update history for graph
  useEffect(() => {
    setHistory(prev => {
      const next = [...prev, { id: Date.now(), value: system.cpu }];
      if (next.length > 30) next.shift(); // Keep last 30 points
      return next;
    });
  }, [system.cpu]);

  const metrics = [
    { label: 'CPU_LOAD', value: `${system.cpu}%`, trend: '+2%', color: 'text-indigo-400' },
    { label: 'MEMORY_USAGE', value: `${system.memory}%`, trend: '-1%', color: 'text-cyan-400' },
    { label: 'NETWORK_LATENCY', value: '24ms', trend: 'stable', color: 'text-emerald-400' }, // Mocked for now
    { label: 'ACTIVE_PODS', value: '12', trend: 'stable', color: 'text-purple-400' }, // Mocked for now
  ];

  return (
    <div className="w-full">
      {/* Header Widget */}
      <div className="flex justify-end mb-8">
        <div className={`
            inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-sm border transition-colors duration-500
            ${system.status === 'healthy' 
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                : 'bg-red-500/10 text-red-500 border-red-500/20'}
        `}>
            <span className="relative h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${system.status === 'healthy' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${system.status === 'healthy' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            </span>
            {system.status === 'healthy' ? 'ALL SYSTEMS OPERATIONAL' : 'SYSTEM OFFLINE'}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((m) => (
            <motion.div 
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-white/20 transition-colors"
            >
                <h3 className="text-slate-400 text-xs font-mono mb-2 uppercase tracking-wider">{m.label}</h3>
                <div className={`text-3xl font-bold font-mono text-white mb-1 ${m.color}`}>
                    <AnimatePresence mode='popLayout'>
                        <motion.span 
                            key={m.value}
                            initial={{ opacity: 0.5, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {m.value}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <div className="text-text-muted text-[10px] font-mono">{m.trend}</div>
            </motion.div>
        ))}
      </div>

      {/* Live Chart Canvas */}
      <div className="flex-1 min-h-[300px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 relative overflow-hidden flex flex-col">
         <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> LIVE THREAD ACTIVITY 
            <span className="text-[10px] text-text-muted font-mono ml-4 opacity-50">
               CURRENT: {system.cpu}% (Updates every 1s)
            </span>
         </h3>
         
         {/* Live Bar Chart */}
         <div className="flex-1 flex items-end gap-1 w-full h-40">
            <AnimatePresence initial={false}>
                {history.map((item) => (
                    <motion.div 
                        key={item.id} 
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: `${Math.max(4, item.value || 0)}%` }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex-1 bg-indigo-500/50 rounded-t-sm hover:bg-indigo-400 border-t border-indigo-300/30"
                        style={{ minHeight: '4px' }}
                    />
                ))}
            </AnimatePresence>
         </div>
         <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_10px)] opacity-50 pointer-events-none"></div>
      </div>
    </div>
  );
}
