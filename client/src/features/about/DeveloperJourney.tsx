import { useState, useEffect, useRef } from 'react';

const storyText = `#!/bin/bash
# INITIALIZING PERSONNEL ORIGIN RECORD... OK

[ORIGIN]
My journey into programming began in 2023 during my freshman year when I wrote my first “Hello World” program in C#. Through coursework, I started building small desktop applications, including a Scientific Calculator and Zodiac Sign Finder as a collaborative final project for the first semester. Later that year, my team developed a desktop Point-of-Sale (POS) system for the second-semester (2024) finals, which introduced me to building more complete applications and working in a development team.

[EVOLUTION]
In my sophomore year (2024), I began learning Python through our Data Structures and Algorithms course and expanded into web development with HTML, CSS, and JavaScript. I contributed as a frontend developer to a collaborative e-commerce web application for our first-semester final project.

During the second semester (2025), I learned Flutter and Firebase through our Application Development course and worked as a fullstack developer on a mobile e-commerce application, extending our previous web project into mobile. During the summer of 2025, I explored modern web development independently by learning React and building my first personal portfolio.

[PRESENT_AND_FUTURE]
In my junior year (2025), I led a 9-member development team for a real-client project in our Software Engineering course, focusing on system design, architecture, CI/CD pipelines, and deployment, which sparked my interest in DevOps.

Today (2026), my focus is on building reliable systems through automation and thoughtful architecture, continuing to learn Docker, Kubernetes, and exploring Artificial Intelligence and Machine Learning to expand my skills toward intelligent, maintainable, and scalable systems.

[EOF]`;

export function DeveloperJourney() {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Blazing fast terminal typing effect
    useEffect(() => {
        let i = 0;
        setDisplayedText("");
        setIsComplete(false);
        const timer = setInterval(() => {
            if (i < storyText.length) {
                // Slice 8 characters per tick (simulates super fast terminal output)
                setDisplayedText(storyText.slice(0, i + 8));
                i += 8;
                
                // Auto scroll to bottom while typing
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            } else {
                setDisplayedText(storyText);
                setIsComplete(true);
                clearInterval(timer);
            }
        }, 15); // Ultra fast refresh (15ms)

        return () => clearInterval(timer);
    }, []);

    // Helper to safely highlight terminal syntax line by line
    const renderLine = (line: string, index: number) => {
        if (line.match(/^\[.*\]$/)) {
            return <div key={index} className="text-emerald-400 font-bold tracking-widest mt-6 mb-2">{line}</div>;
        }
        if (line.startsWith('#')) {
            return <div key={index} className="text-white/30 italic">{line}</div>;
        }
        return <div key={index} className="text-slate-300 min-h-[1.5em]">{line}</div>;
    };

    return (
        <div className="h-full flex flex-col font-mono text-sm bg-[#0d0d0d]">
            {/* Header Line */}
            <div className="flex bg-white/5 border-b border-white/10 text-xs font-bold tracking-wider">
                <div className="flex-1 py-2 px-4 bg-emerald-900/40 text-emerald-400 border-b-2 border-emerald-500">
                    [ DEVELOPER_JOURNEY.LOG ]
                </div>
            </div>

            {/* Terminal Window */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                <div className="max-w-3xl mx-auto space-y-4">
                    
                    {/* The Command that initiated this readout */}
                    <div className="flex items-center gap-3 text-white/50 mb-6">
                        <span className="text-emerald-500 font-bold">~</span>
                        <span>$</span>
                        <span className="text-cyan-400">cat</span>
                        <span>/var/log/career_trajectory.txt</span>
                    </div>

                    {/* Highly Controlled Output Grid */}
                    <div className="leading-[1.8] whitespace-pre-wrap font-mono text-[13px] md:text-sm">
                        
                        {displayedText.split('\n').map((line, index, array) => (
                            <div key={index} className="inline-block w-full">
                                {renderLine(line, index)}
                                {/* Add blinking cursor ONLY to the last rendered exact line block, but only while typing */}
                                {index === array.length - 1 && !isComplete && (
                                    <span className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse ml-1 align-middle shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                                )}
                            </div>
                        ))}

                        {/* Final Command Prompt when complete */}
                        {isComplete && (
                            <div className="mt-8 flex items-center gap-3 text-white/50">
                                <span className="text-emerald-500 font-bold">~</span>
                                <span>$</span>
                                <span className="inline-block w-2.5 h-4 bg-emerald-400 animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Command Line Footer */}
            <div className="p-2 border-t border-white/20 text-[10px] text-slate-500 flex justify-between bg-[#08080a] uppercase tracking-widest font-bold">
                <div>
                    <span className="text-emerald-500 mr-2">«</span> 
                    <span className="text-white">SYS_READOUT_{isComplete ? 'COMPLETE' : 'IN_PROGRESS'}</span>
                </div>
                <div className="hidden sm:block">ENCRYPTION: NONE</div>
            </div>
        </div>
    );
}
