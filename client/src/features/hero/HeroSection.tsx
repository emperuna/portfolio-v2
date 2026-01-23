import { motion } from 'framer-motion';
import { HeroBackground } from './components/HeroBackground';
import { HeroContent } from './components/HeroContent';
import { HeroHud } from './components/HeroHud';

export function HeroSection() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        >
            {/* BACKGROUND: Full Screen Interactive Grid */}
            <div className="absolute inset-0 z-0">
                <HeroBackground />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    
                    {/* Left: Content & Terminal */}
                    <HeroContent />

                    {/* Right: HUD Elements Only (Grid is now background) */}
                    <HeroHud />

                </div>
            </div>
        </motion.div>
    );
}
