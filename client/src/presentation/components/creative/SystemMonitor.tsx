import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Mock Kernel Data
// Mock Kernel Data (Skills)
// Categorized Modules
const SKILLS_MODULES = [
    { 
        category: "DEVOPS & INFRASTRUCTURE",
        modules: [
            { id: 'OPS_01', name: 'GitHub Actions', status: 'ONLINE' },
            { id: 'OPS_02', name: 'Docker', status: 'ONLINE' },
            { id: 'OPS_03', name: 'Cloudflare', status: 'ONLINE' },
            { id: 'OPS_04', name: 'Railway', status: 'ONLINE' },
            { id: 'OPS_05', name: 'Render', status: 'ONLINE' },
            { id: 'OPS_06', name: 'Heroku', status: 'ONLINE' },
            { id: 'OPS_07', name: 'Vercel', status: 'ONLINE' },
            { id: 'OPS_08', name: 'Netlify', status: 'ONLINE' },
            { id: 'OPS_09', name: 'Bash', status: 'ONLINE' },
            { id: 'OPS_10', name: 'Python (Scripting)', status: 'ONLINE' },
            { id: 'OPS_11', name: 'Git', status: 'ONLINE' },
        ]
    },
    { 
        category: "LANGUAGES",
        modules: [
            { id: 'LANG_01', name: 'Java', status: 'ONLINE' },
            { id: 'LANG_02', name: 'Python', status: 'ONLINE' },
            { id: 'LANG_03', name: 'JavaScript', status: 'ONLINE' },
            { id: 'LANG_04', name: 'TypeScript', status: 'ONLINE' },
            { id: 'LANG_05', name: 'C#', status: 'ONLINE' },
            { id: 'LANG_06', name: 'Dart', status: 'ONLINE' },
            { id: 'LANG_07', name: 'HTML5', status: 'ONLINE' },
            { id: 'LANG_08', name: 'CSS3', status: 'ONLINE' },
            { id: 'LANG_09', name: 'Markdown', status: 'ONLINE' },
        ]
    },
    { 
        category: "FRAMEWORKS & LIBS",
        modules: [
            { id: 'FW_01', name: 'Spring Boot', status: 'ONLINE' },
            { id: 'FW_02', name: 'Django', status: 'ONLINE' },
            { id: 'FW_03', name: 'Flask', status: 'ONLINE' },
            { id: 'FW_04', name: 'React', status: 'ONLINE' },
            { id: 'FW_05', name: 'Flutter', status: 'ONLINE' },
            { id: 'FW_06', name: 'Tailwind CSS', status: 'ONLINE' },
            { id: 'FW_07', name: 'Bootstrap', status: 'ONLINE' },
        ]
    },
    { 
        category: "TOOLS",
        modules: [
            { id: 'TOOL_01', name: 'GitHub', status: 'ONLINE' },
            { id: 'TOOL_02', name: 'VS Code', status: 'ONLINE' },
            { id: 'TOOL_03', name: 'Antigravity', status: 'ONLINE' },
            { id: 'TOOL_04', name: 'Figma', status: 'ONLINE' },
        ]
    }
];

const PROCESS_LOGS = [
    { time: '2025-01-26 10:00:00', level: 'INFO', msg: 'Role: Team Lead @ SBCC Management System (9 Members)', status: 'RUNNING' },
    { time: '2025-01-26 09:55:00', level: 'SUCCESS', msg: 'Architected infrastructure & resolved env consistency methodology', status: 'COMPLETED' },
    { time: '2024-11-15 14:00:00', level: 'INFO', msg: 'Implemented CI/CD Pipelines (GitHub Actions) for Trabahanap MVP', status: 'ACTIVE' },
    { time: '2024-10-01 08:30:00', level: 'INFO', msg: 'Containerized microservices using Docker & Docker Compose', status: 'DEPLOYED' },
    { time: '2024-09-10 16:45:00', level: 'WARN', msg: 'Optimized Multi-Cloud Strategy (Railway, Render, Cloudflare)', status: 'OPTIMIZED' },
    { time: '2023-08-01 08:00:00', level: 'INFO', msg: 'Freshman Year Init: Full-Stack Dev Focus (React/Django)', status: 'ARCHIVED' },
];

export function SystemMonitor() {
    const [uptime, setUptime] = useState<string>('');
    const [activePage, setActivePage] = useState(0);

    // Simulate uptime ticker
    useEffect(() => {
        const start = new Date('2023-08-01').getTime(); // Started College
        const update = () => {
            const now = Date.now();
            const diff = now - start;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            setUptime(`${days}d ${hours}h`);
        };
        update();
        const i = setInterval(update, 60000);
        return () => clearInterval(i);
    }, []);

    const currentGroup = SKILLS_MODULES[activePage];

    return (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
            
            {/* PANEL 1: KERNEL RESOURCES (SKILLS) */}
            <div className="lg:col-span-2 border border-white/10 bg-[#0f1117]/90 rounded-lg p-4 shadow-xl backdrop-blur-md flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-white bg-white/5 px-2 py-1 rounded text-[10px] font-bold tracking-wider">
                        SYSTEM_RESOURCES // PAGE {activePage + 1}/{SKILLS_MODULES.length}
                    </div>
                    
                    {/* Pagination Controls */}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setActivePage(p => Math.max(0, p - 1))}
                            disabled={activePage === 0}
                            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            {'<'}
                        </button>
                        <button 
                            onClick={() => setActivePage(p => Math.min(SKILLS_MODULES.length - 1, p + 1))}
                            disabled={activePage === SKILLS_MODULES.length - 1}
                            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            {'>'}
                        </button>
                    </div>
                </div>
                
                {/* Categorized Grid (Single Page View) */}
                <div className="flex-1">
                    <motion.div 
                        key={currentGroup.category}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-cyan-400 text-[10px] uppercase tracking-widest mb-4 border-b border-white/5 pb-1 w-fit">
                            {'>'} MOUNT_POINT: {currentGroup.category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {currentGroup.modules.map((core) => (
                                <div key={core.id} className="relative bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between group hover:bg-white/10 transition-all duration-300">
                                    {/* Decorative Corner */}
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 rounded-tr-sm"></div>
                                    
                                    <div className="flex items-center gap-3">
                                        {/* LED Status */}
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
                                        
                                        <div>
                                            <div className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors tracking-wide">
                                                {core.name}
                                            </div>
                                            <div className="text-[9px] text-slate-500 font-mono tracking-wider">
                                                ID: {core.id}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-2 py-1 rounded bg-black/20 border border-white/5">
                                        <span className="text-[10px] font-mono text-emerald-400 font-medium tracking-wider">
                                            {core.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* PANEL 2: KERNEL INFO (BIO) */}
            <div className="border border-white/10 bg-[#0f1117]/90 rounded-lg p-4 shadow-xl backdrop-blur-md flex flex-col gap-4">
                 <div className="text-white bg-white/5 px-2 py-1 inline-block rounded text-[10px] font-bold tracking-wider w-fit">
                    KERNEL_INFO // BIO
                </div>
                
                <div className="text-slate-400 space-y-4 leading-relaxed">
                    <p>
                        <span className="text-cyan-400"></span> <span className="text-white">Jeremy</span> is a Junior CS student transitioning to <span className="text-emerald-400">DevOps & Platform Engineering</span>.
                    </p>
                    <p>
                        <span className="text-cyan-400"></span> Primary Directive: Building reliable systems, automating pipelines, and solving environment consistency.
                    </p>
                    
                    <div className="border-t border-white/5 pt-3">
                        <div className="text-[10px] uppercase text-slate-500 mb-2">ACTIVE_INTERESTS</div>
                         <ul className="space-y-1 pl-2 border-l border-cyan-500/30">
                            <li><span className="text-cyan-400 mr-2">+</span>Kubernetes</li>
                            <li><span className="text-cyan-400 mr-2">+</span>Terraform</li>
                            <li><span className="text-cyan-400 mr-2">+</span>Cloud Architecture</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-auto pt-3 border-t border-white/5">
                     <ul className="space-y-2 text-[10px] text-slate-500">
                        <li className="flex justify-between">
                            <span>LOCATION:</span>
                            <span className="text-white">Philippines (AP-SE-1)</span>
                        </li>
                         <li className="flex justify-between">
                            <span>UPTIME:</span>
                            <span className="text-emerald-400">{uptime}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* PANEL 3: PROCESS_LOG (EXPERIENCE) */}
            <div className="lg:col-span-3 border border-white/10 bg-black/80 rounded-lg p-4 shadow-xl backdrop-blur-md font-mono text-xs overflow-hidden">
                 <div className="text-white bg-white/5 px-2 py-1 mb-2 inline-block rounded text-[10px] font-bold tracking-wider">
                    PROCESS_LOG (EXPERIENCE)
                </div>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                    {PROCESS_LOGS.map((log, i) => (
                        <div key={i} className="grid grid-cols-12 gap-2 opacity-80 hover:opacity-100 hover:bg-white/5 p-1 rounded transition-colors group">
                            <div className="col-span-2 text-slate-500 text-[10px]">{log.time.split(' ')[0]}</div>
                            <div className={`col-span-1 font-bold ${log.level === 'WARN' ? 'text-orange-400' : 'text-cyan-400'}`}>[{log.level}]</div>
                            <div className="col-span-7 text-white group-hover:text-cyan-200">{log.msg}</div>
                            <div className="col-span-2 text-right">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] ${log.status === 'RUNNING' || log.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' : 'bg-white/10 text-slate-400'}`}>
                                    {log.status}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="text-emerald-500 animate-pulse mt-2">_</div>
                </div>
            </div>

        </div>
    );
}
