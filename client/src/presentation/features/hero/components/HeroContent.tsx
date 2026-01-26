import { motion } from 'framer-motion';
import StatusWidget from '../../../components/shared/StatusWidget';
import { TypewriterText } from '../../../components/ui/TypewriterText';
import { HeroTerminal } from './HeroTerminal';

export function HeroContent() {
    return (
        <div className="space-y-8">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                            delayChildren: 0.5
                        }
                    }
                }}
                className="flex flex-col items-start gap-6 pt-20 md:pt-0"
            >
                {/* Status Line */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="flex items-center gap-3"
                >
                    <StatusWidget />
                    <div className="h-px w-8 bg-white/10"></div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500/80">
                        // Operational
                    </span>
                </motion.div>
                
                {/* Hero Title - Fixed height container (approx 2.5 lines) to ABSOLUTELY prevent layout shifts */ }
                <div className="min-h-[2.5em] flex items-center">
                    <motion.h1 
                        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                        className="text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent leading-[0.9] select-none" 
                    >
                        <TypewriterText 
                            texts={[
                                "SYSTEM ONLINE",
                                "INITIALIZING...",
                                "SYNC READY",
                                "ACCESS LIVE"
                            ]}
                            typingSpeed={80}
                            deletingSpeed={40}
                            delayBetween={2000}
                        />
                    </motion.h1>
                </div>
                
                {/* Description */}
                <motion.p 
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="max-w-md text-lg text-text-muted leading-relaxed"
                >
                    Full-stack infrastructure visualization and automated deployment logs.
                </motion.p>
            </motion.div>

            {/* Terminal */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="w-full"
            >
                <HeroTerminal className="w-full" />
            </motion.div>
        </div>
    );
}
