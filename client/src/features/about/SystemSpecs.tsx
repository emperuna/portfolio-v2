import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNowStrict } from 'date-fns';

interface SkillModule {
    id: string;
    name: string;
    iconId?: string;
    slug?: string;
    color?: string;
}

interface SkillCategory {
    category: string;
    modules: SkillModule[];
}

// Mock Data for Skills (Categorized)
const SKILLS_MODULES: SkillCategory[] = [
    { 
        category: "devops-infra", 
        modules: [
            { id: 'OPS_01', name: 'GitHub Actions', iconId: 'githubactions' },
            { id: 'OPS_02', name: 'Docker', iconId: 'docker' },
            { id: 'OPS_03', name: 'Cloudflare', slug: 'cloudflare', color: 'F38020' },
            { id: 'OPS_04', name: 'Railway', slug: 'railway', color: '0BC5AD' },
            { id: 'OPS_05', name: 'Render', slug: 'render', color: 'white' },
            { id: 'OPS_06', name: 'Heroku', iconId: 'heroku', color: '430098' },
            { id: 'OPS_07', name: 'Vercel', iconId: 'vercel' },
            { id: 'OPS_08', name: 'Netlify', iconId: 'netlify' },
            { id: 'OPS_09', name: 'Bash', iconId: 'bash' },
            { id: 'OPS_10', name: 'Python', iconId: 'python' },
            { id: 'OPS_11', name: 'Git', iconId: 'git' },
        ]
    },
    {
        category: "languages",
        modules: [
            { id: 'LANG_01', name: 'Java', iconId: 'java' },
            { id: 'LANG_02', name: 'Python', iconId: 'python' },
            { id: 'LANG_03', name: 'JavaScript', iconId: 'js' },
            { id: 'LANG_04', name: 'TypeScript', iconId: 'ts' },
            { id: 'LANG_05', name: 'C#', iconId: 'cs' },
            { id: 'LANG_06', name: 'Dart', iconId: 'dart' },
            { id: 'LANG_07', name: 'HTML5', iconId: 'html' },
            { id: 'LANG_08', name: 'CSS3', iconId: 'css' },
            { id: 'LANG_09', name: 'Markdown', iconId: 'md' },
        ]
    },
    {
        category: "frameworks-libs",
        modules: [
            { id: 'FW_01', name: 'Spring Boot', iconId: 'spring' },
            { id: 'FW_02', name: 'Django', iconId: 'django' },
            { id: 'FW_03', name: 'Flask', iconId: 'flask' },
            { id: 'FW_04', name: 'React', iconId: 'react' },
            { id: 'FW_05', name: 'Astro', iconId: 'astro' },
            { id: 'FW_06', name: 'Flutter', iconId: 'flutter' },
            { id: 'FW_07', name: 'Tailwind CSS', iconId: 'tailwind' },
            { id: 'FW_08', name: 'Bootstrap', iconId: 'bootstrap' },
        ]
    },
    {
        category: "tools-environment",
        modules: [
            { id: 'TOOL_01', name: 'GitHub', iconId: 'github' },
            { id: 'TOOL_02', name: 'VS Code', iconId: 'vscode' },
            { id: 'TOOL_03', name: 'Antigravity', slug: 'ai-core' },
            { id: 'TOOL_04', name: 'Figma', iconId: 'figma' },
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
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {cat.modules.map((mod) => (
                                        <div key={mod.id} className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded px-2 py-1.5 transition-all cursor-default hover:border-primary/30">
                                            {mod.slug === 'ai-core' ? (
                                                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                </div>
                                            ) : (
                                                <img 
                                                    src={mod.iconId ? `https://skillicons.dev/icons?i=${mod.iconId}` : `https://cdn.simpleicons.org/${mod.slug}/${mod.color || 'white'}`} 
                                                    alt={mod.name} 
                                                    className="w-4 h-4 object-contain brightness-90 group-hover:brightness-110 transition-all"
                                                />
                                            )}
                                            <span className="text-white/70 group-hover:text-white text-[10px] font-medium tracking-wide transition-colors">{mod.name}</span>
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
