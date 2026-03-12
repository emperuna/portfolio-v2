import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
    name: string;
    path: string;
}

const NAV_ITEMS: NavItem[] = [
    { name: 'SYSTEM', path: '/' },
    { name: 'MODULES', path: '/projects' },
    { name: 'LOGS', path: '/about' },
    { name: 'STATUS', path: '/status' },
];

interface NavigationSwitcherProps {
    currentPath: string;
}

export const NavigationSwitcher: React.FC<NavigationSwitcherProps> = ({ currentPath }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Normalize path for matching
    const activeIndex = NAV_ITEMS.findIndex(item => 
        item.path === currentPath || (item.path !== '/' && currentPath.startsWith(item.path))
    );
    const activeItem = activeIndex === -1 ? NAV_ITEMS[0] : NAV_ITEMS[activeIndex];

    const toggleMenu = () => setIsOpen(!isOpen);

    // Scroll Lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const activeClass = "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]";
    const inactiveClass = "text-white/40 hover:text-white/70";

    return (
        <div className="relative pointer-events-auto w-full max-w-full flex justify-center items-center">
            {/* DESKTOP DOCK (Visible on sm+) */}
            <div className="hidden sm:flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1.5 px-3 backdrop-blur-xl shadow-2xl">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.path}
                        href={item.path}
                        className={`rounded-full px-4 py-1.5 text-[10px] sm:text-xs font-medium transition-all duration-300 ${
                            activeItem.path === item.path ? activeClass : inactiveClass
                        }`}
                    >
                        {item.name}
                    </a>
                ))}
            </div>

            {/* MOBILE HAMBURGER (Visible strictly on mobile) */}
            <div className="sm:hidden flex justify-end w-full px-2">
                <motion.button
                    onClick={toggleMenu}
                    whileTap={{ scale: 0.9 }}
                    className="z-[110] relative p-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl group"
                >
                    <div className="w-6 h-5 flex flex-col justify-between items-end">
                        <motion.span 
                            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 9 : 0, width: isOpen ? "100%" : "100%" }}
                            className="h-0.5 bg-white/80 rounded-full block"
                        />
                        <motion.span 
                            animate={{ opacity: isOpen ? 0 : 1, width: "70%" }}
                            className="h-0.5 bg-white/80 rounded-full block"
                        />
                        <motion.span 
                            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -9 : 0, width: isOpen ? "100%" : "100%" }}
                            className="h-0.5 bg-white/80 rounded-full block"
                        />
                    </div>
                </motion.button>
            </div>

            {/* SLIDE-OUT PANEL */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101] sm:hidden"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-full max-w-[320px] bg-[#08080a] border-l border-white/10 z-[105] flex flex-col sm:hidden shadow-2xl overflow-hidden"
                        >

                            {/* Header */}
                            <div className="p-8 border-b border-white/5 flex items-center justify-between relative z-10">
                                <div className="space-y-1">
                                    <h3 className="text-white/40 text-[9px] font-mono font-bold tracking-[0.4em] uppercase">System_Index</h3>
                                    <p className="text-primary text-[10px] font-mono font-bold tracking-widest">VERSION_V3.1</p>
                                </div>
                                <button onClick={toggleMenu} className="text-white/40 hover:text-white transition-colors rotate-0 hover:rotate-90 duration-300">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            {/* Nav Body */}
                            <div className="flex-1 p-6 space-y-4 overflow-y-auto relative z-10">
                                {NAV_ITEMS.map((item, i) => (
                                    <motion.a
                                        key={item.path}
                                        href={item.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 + 0.2 }}
                                        className={`flex items-center justify-between p-5 rounded-xl border transition-all group overflow-hidden relative
                                            ${activeItem.path === item.path 
                                                ? 'bg-primary/10 border-primary/30 text-primary' 
                                                : 'border-white/5 bg-white/5 text-white/40 hover:bg-white/10 hover:border-white/20 active:scale-95'}
                                        `}
                                    >
                                        <span className="text-xs font-bold tracking-[0.3em] font-mono uppercase">{item.name}</span>
                                        <span className={`text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${activeItem.path === item.path ? 'text-primary' : 'text-white/10'}`}>
                                            ↗
                                        </span>
                                        
                                        {activeItem.path === item.path && (
                                            <div className="absolute inset-0 bg-primary/5 blur-2xl pointer-events-none" />
                                        )}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
