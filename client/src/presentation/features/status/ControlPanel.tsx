import { motion } from 'framer-motion';

interface ControlPanelProps {
    debugMode: boolean;
    setDebugMode: (val: boolean) => void;
    trafficLevel: 'low' | 'high';
    setTrafficLevel: (val: 'low' | 'high') => void;
}

export function ControlPanel({ debugMode, setDebugMode, trafficLevel, setTrafficLevel }: ControlPanelProps) {
    return (
        <div className="h-[150px] border-t border-primary/20 p-4 font-mono text-xs flex flex-col justify-between bg-primary/5 select-none">
            <div className="space-y-3">
                
                {/* Switch 1: Debug Mode */}
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setDebugMode(!debugMode)}>
                    <span className="text-primary/60 group-hover:text-primary transition-colors">DEBUG_MODE</span>
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${debugMode ? 'bg-primary/40' : 'bg-primary/10'}`}>
                        <motion.div 
                            className="w-3 h-3 rounded-full bg-primary shadow-sm"
                            animate={{ x: debugMode ? 16 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </div>
                </div>

                {/* Switch 2: Traffic Load */}
                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setTrafficLevel(trafficLevel === 'low' ? 'high' : 'low')}>
                    <span className="text-primary/60 group-hover:text-primary transition-colors">TRAFFIC_SIM</span>
                    <div className="flex items-center space-x-2 text-[9px] bg-black/20 rounded px-1 py-0.5">
                        <span className={trafficLevel === 'low' ? 'text-emerald-400' : 'text-primary/30'}>LO</span>
                        <span className="text-primary/20">|</span>
                        <span className={trafficLevel === 'high' ? 'text-amber-400' : 'text-primary/30'}>HI</span>
                    </div>
                </div>

            </div>

             <div className="pt-2 text-[9px] text-center text-primary/30 uppercase tracking-widest border-t border-primary/10 mt-2">
                User Configuration Access
            </div>
        </div>
    );
}
