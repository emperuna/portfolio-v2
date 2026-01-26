import { motion } from 'framer-motion';

export function CommandIdentity() {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative md:absolute md:top-8 md:left-8 lg:top-12 lg:left-12 pointer-events-auto mb-6 md:mb-0"
        >
            <div className="flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white/90">
                    JEREMY GARIN
                </h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs md:text-sm font-mono text-emerald-500/80 tracking-widest uppercase">
                        DevOps Engineer
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
