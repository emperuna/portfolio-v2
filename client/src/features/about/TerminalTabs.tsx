import { useState, useEffect } from 'react';
import { RuntimeLogs } from './RuntimeLogs';
import { PersonnelFile } from './PersonnelFile';
import { DeveloperJourney } from './DeveloperJourney';

export function TerminalTabs() {
    const [activeTab, setActiveTab] = useState<number>(1);

    // Keyboard navigation (1 for dossier, 2 for telemetry, 3 for developer_journey)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '1') setActiveTab(1);
            if (e.key === '2') setActiveTab(2);
            if (e.key === '3') setActiveTab(3);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="h-full flex flex-col w-full">
            {/* TERMINAL HEADER (TMUX STYLE) */}
            <div className="h-10 bg-[#040405] border-b border-white/10 flex items-center justify-between text-[9px] sm:text-[10px] tracking-widest select-none font-bold uppercase w-full">
                <div className="flex items-center h-full overflow-x-auto no-scrollbar">
                    {/* User Prompt - Hidden on tiny mobile screens */}
                    <div className="hidden sm:flex px-3 md:px-4 border-r border-white/10 h-full items-center bg-white/5 text-primary/70 shrink-0">
                        admin@portfolio:~
                    </div>
                    
                    {/* Tab 1: Personnel File */}
                    <button 
                        onClick={() => setActiveTab(1)}
                        className={`h-full px-3 md:px-4 border-r border-white/10 flex items-center gap-2 transition-colors shrink-0
                            ${activeTab === 1 ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-b-emerald-500' : 'text-white/40 hover:bg-white/5 hover:text-white/70'}
                        `}
                    >
                        <span className="hidden sm:inline">1:</span><span className="text-[10px] sm:text-xs">personnel_file</span>
                        {activeTab === 1 && <span className="text-[8px] animate-pulse hidden sm:inline">●</span>}
                    </button>

                    {/* Tab 2: Telemetry */}
                    <button 
                        onClick={() => setActiveTab(2)}
                        className={`h-full px-3 md:px-4 border-r border-white/10 flex items-center gap-2 transition-colors shrink-0
                            ${activeTab === 2 ? 'bg-primary/10 text-primary border-b-2 border-b-primary' : 'text-white/40 hover:bg-white/5 hover:text-white/70'}
                        `}
                    >
                        <span className="hidden sm:inline">2:</span><span className="text-[10px] sm:text-xs">telemetry</span>
                        {activeTab === 2 && <span className="text-[8px] animate-pulse hidden sm:inline">●</span>}
                    </button>

                    {/* Tab 3: Developer Journey */}
                    <button 
                        onClick={() => setActiveTab(3)}
                        className={`h-full px-3 md:px-4 border-r border-white/10 flex items-center gap-2 transition-colors shrink-0
                            ${activeTab === 3 ? 'bg-cyan-500/10 text-cyan-400 border-b-2 border-b-cyan-500' : 'text-white/40 hover:bg-white/5 hover:text-white/70'}
                        `}
                    >
                        <span className="hidden sm:inline">3:</span><span className="text-[10px] sm:text-xs text-nowrap">developer_journey</span>
                        {activeTab === 3 && <span className="text-[8px] animate-pulse hidden sm:inline">●</span>}
                    </button>
                </div>

                {/* Right side stats */}
                <div className="flex items-center gap-4 sm:gap-6 text-white/30 px-6">
                    <span className="hidden lg:inline"><span className="text-white/10">MEM:</span> 4.1GB/16.0GB</span>
                    <span className="text-primary/40 flex items-center gap-2">
                        <span>[tmux: windows 3]</span>
                    </span>
                </div>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="flex-1 relative overflow-hidden bg-[#0a0a0c] min-h-[500px] lg:min-h-0">
                {/* 
                  Instead of unmounting the components (which resets their state/animations),
                  we keep them mounted and toggle their visibility via CSS classes. 
                */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 1 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <PersonnelFile />
                </div>
                
                <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 2 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <RuntimeLogs />
                </div>
                
                <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 3 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <DeveloperJourney />
                </div>
            </div>
        </div>
    );
}
