import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNowStrict } from 'date-fns';

// Mock Data for Skills (Categorized)
const SKILLS_MODULES = [
    { 
        category: "devops-infra", 
        modules: [
            { id: 'OPS_01', name: 'GitHub Actions', version: 'v3.0' },
            { id: 'OPS_02', name: 'Docker', version: '24.0' },
            { id: 'OPS_03', name: 'Cloudflare', version: 'worker' },
            { id: 'OPS_04', name: 'Railway', version: 'stable' },
            { id: 'OPS_05', name: 'Render', version: 'auto' },
            { id: 'OPS_06', name: 'Heroku', version: 'cli-8.0' },
            { id: 'OPS_07', name: 'Vercel', version: 'cli-32' },
            { id: 'OPS_08', name: 'Netlify', version: 'cli-16' },
            { id: 'OPS_09', name: 'Bash', version: '5.2' },
            { id: 'OPS_10', name: 'Python (Scripting)', version: '3.11' },
            { id: 'OPS_11', name: 'Git', version: '2.43' },
        ]
    },
    {
        category: "languages",
        modules: [
            { id: 'LANG_01', name: 'Java', version: '17-lts' },
            { id: 'LANG_02', name: 'Python', version: '3.11' },
            { id: 'LANG_03', name: 'JavaScript', version: 'es2023' },
            { id: 'LANG_04', name: 'TypeScript', version: '5.3' },
            { id: 'LANG_05', name: 'C#', version: 'dotnet-8' },
            { id: 'LANG_06', name: 'Dart', version: '3.2' },
            { id: 'LANG_07', name: 'HTML5', version: 'w3c' },
            { id: 'LANG_08', name: 'CSS3', version: 'modules' },
            { id: 'LANG_09', name: 'Markdown', version: 'gfm' },
        ]
    },
    {
        category: "frameworks-libs",
        modules: [
            { id: 'FW_01', name: 'Spring Boot', version: '3.2' },
            { id: 'FW_02', name: 'Django', version: '5.0' },
            { id: 'FW_03', name: 'Flask', version: '3.0' },
            { id: 'FW_04', name: 'React', version: '18.2' },
            { id: 'FW_05', name: 'Flutter', version: '3.16' },
            { id: 'FW_06', name: 'Tailwind CSS', version: '3.4' },
            { id: 'FW_07', name: 'Bootstrap', version: '5.3' },
        ]
    },
    {
        category: "tools-environment",
        modules: [
            { id: 'TOOL_01', name: 'GitHub', version: 'stable' },
            { id: 'TOOL_02', name: 'VS Code', version: '1.85' },
            { id: 'TOOL_03', name: 'Antigravity', version: 'ai-core' },
            { id: 'TOOL_04', name: 'Figma', version: 'beta' },
        ]
    }
];

// Mock Data for Education
const EDUCATION = [
    { institution: 'Laguna State Polytechnic University', degree: 'BS Computer Science', year: '2023-NOW', status: 'building...' },
];

export function SystemSpecs() {
    const [uptime, setUptime] = useState<string>('calculating...');

    useEffect(() => {
        // GitHub account creation date
        const gitHubBirth = new Date('2023-11-25T13:58:38Z');
        setUptime(formatDistanceToNowStrict(gitHubBirth));
    }, []);

    return (
        <div className="h-full flex flex-col font-mono text-xs text-slate-300 p-0">
            {/* Header */}
            <div className="flex bg-white/5 px-4 py-2 text-slate-400 border-b border-white/10 uppercase tracking-widest text-[10px]">
                <span>System Information</span>
                <span className="ml-auto">x86_64-linux-gnu</span>
            </div>

            <div className="p-4 space-y-6 overflow-y-auto custom-scrollbar">
                
                {/* NEOFETCH STYLE INFO */}
                <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center sm:items-start text-center sm:text-left">
                    <div className="text-primary font-bold select-none leading-tight mr-2 mt-1">
                        <pre>{`      _  ____ 
     | |/ ___|
  _  | | |  _ 
 | |_| | |_| |
  \\___/ \\____|`}</pre>
                    </div>
                    <div className="space-y-1">
                        <div className="text-white font-bold mb-2">admin@portfolio</div>
                        <div className="flex gap-2">
                            <span className="text-primary font-bold">OS:</span>
                            <span>PortfolioOS v2.0</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-primary font-bold">Kernel:</span>
                            <span>5.15.0-76-generic (DevOps)</span>
                        </div>
                         <div className="flex gap-2">
                            <span className="text-cyan-500 font-bold">Uptime:</span>
                            <span>{uptime}</span>
                        </div>
                         <div className="flex gap-2">
                            <span className="text-cyan-500 font-bold">Packages:</span>
                            <span>{SKILLS_MODULES.reduce((acc, cat) => acc + cat.modules.length, 0)} (dpkg)</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-cyan-500 font-bold">Shell:</span>
                            <span>zsh 5.9</span>
                        </div>
                    </div>
                </div>

                {/* SKILL PACKAGES (APT LIST) */}
                <div>
                     <div className="text-emerald-500 font-bold mb-2 border-b border-white/10 pb-1">
                        ➜ apt list --installed | grep 'skills'
                    </div>
                    <div className="space-y-4 pl-2">
                        {SKILLS_MODULES.map((cat, i) => (
                            <div key={i}>
                                <div className="text-slate-500 mb-1 ml-2"># {cat.category}</div>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {cat.modules.map((mod) => (
                                        <div key={mod.id} className="group flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded px-2 py-1 transition-colors cursor-default">
                                            <span className="text-cyan-300 text-[10px] font-medium tracking-wide">{mod.name}</span>
                                            <span className="text-slate-500 text-[9px] group-hover:text-slate-400 transition-colors">{mod.version}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* EDUCATION */}
                 <div>
                    <div className="text-emerald-500 font-bold mb-2 mt-6 border-b border-white/10 pb-1">
                        ➜ cat /etc/education.conf
                    </div>
                    {EDUCATION.map((edu, i) => (
                         <div key={i} className="pl-2 border-l-2 border-white/10 ml-1">
                            <div className="text-white font-bold">{edu.institution}</div>
                            <div className="text-slate-400">{edu.degree}</div>
                            <div className="flex gap-2 mt-1 text-[10px] text-slate-500">
                                <span>[{edu.year}]</span>
                                <span className={edu.status.includes('building') ? 'text-yellow-500' : 'text-emerald-500'}>{edu.status}</span>
                            </div>
                         </div>
                    ))}
                 </div>

            </div>
        </div>
    );
}
