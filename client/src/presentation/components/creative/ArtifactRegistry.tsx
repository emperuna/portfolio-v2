import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mapProjectStatusToDisplay, type ProjectStatus } from '@domain';
import { StatusPill } from '../ui/StatusPill';

interface Project {
    id: string;
    name: string;
    version: string;
    status: ProjectStatus;
    lastPush: string;
    size: string;
    tags: string[];
    description: string;
    repoUrl?: string;
    details?: object;
}

const SAMPLE_PROJECTS: Project[] = [
    {
        id: "pkg-001",
        name: "@portfolio/digital-twin",
        version: "2.0.1-beta",
        status: "live",
        lastPush: "2 mins ago",
        size: "4.2MB",
        tags: ["astro", "react", "framer"],
        description: "Self-replicating portfolio instance with neural-link interface.",
        details: { architecture: "Island", rendering: "SSR", deployment: "Edge" }
    },
    {
        id: "pkg-002",
        name: "k8s-operator-chaos",
        version: "0.9.0",
        status: "developing",
        lastPush: "2 days ago",
        size: "12MB",
        tags: ["go", "kubernetes", "controller"],
        description: "Simulates random pod failures to test resilience.",
        details: { language: "Go 1.21", platform: "Linux", license: "MIT" }
    },
    {
        id: "pkg-003",
        name: "legacy-fintech-core",
        version: "1.0.0",
        status: "maintenance",
        lastPush: "1 year ago",
        size: "156MB",
        tags: ["java", "spring", "oracle"],
        description: "Monolithic payment processor. Do not touch.",
        details: { uptime: "99.99%", techDebt: "High", deprecationDate: "2025" }
    },
    {
        id: "pkg-004",
        name: "agent-swarm-v1",
        version: "0.0.1",
        status: "archived",
        lastPush: "3 years ago",
        size: "450MB",
        tags: ["python", "tensorflow"],
        description: "Failed experiment in autonomous coding agents.",
        details: { reason: "Recursion error", activeNodes: 0 }
    }
];

export function ArtifactRegistry() {
    const [search, setSearch] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filtered = SAMPLE_PROJECTS.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="w-full max-w-6xl mx-auto font-mono text-sm relative min-h-[600px] flex gap-6">
            
            {/* Main Registry Panel */}
            <div className="flex-1 flex flex-col gap-4">
                {/* Toolbar */}
                <div className="flex items-center gap-4 p-4 border border-white/10 bg-[#0f1117]/80 backdrop-blur-md rounded-lg">
                    <div className="flex items-center gap-2 text-text-muted flex-1">
                        <span className="text-cyan-500">{'>'}</span>
                        <span className="text-purple-400">grep</span>
                        <input 
                            type="text" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="filter_query module_list" 
                            className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/20"
                            autoFocus
                        />
                    </div>
                    <div className="hidden md:flex gap-6 text-xs text-text-muted">
                        <span>MODULES: {filtered.length}</span>
                        <span>REGISTRY: ONLINE</span>
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-text-muted uppercase tracking-wider border-b border-white/5 bg-white/5 rounded-t-lg">
                    <div className="col-span-4">Package Name</div>
                    <div className="col-span-2">Version</div>
                    <div className="col-span-2">Last Push</div>
                    <div className="col-span-1">Size</div>
                    <div className="col-span-3 text-right">Tags</div>
                </div>

                {/* List */}
                <div className="space-y-1">
                    {filtered.length === 0 && (
                        <div className="p-8 text-center text-red-400 border border-red-500/10 bg-red-500/5 rounded-lg">
                            Error 404: No artifacts found matching query "{search}".
                        </div>
                    )}
                    
                    {filtered.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => setSelectedProject(p)}
                            className={`grid grid-cols-12 gap-4 px-4 py-3 items-center cursor-pointer border-b border-white/5 transition-all duration-200 group relative overflow-hidden
                                ${selectedProject?.id === p.id ? 'bg-cyan-500/10 border-cyan-500/30' : 'hover:bg-white/5'}
                            `}
                        >
                            {/* Hover Scanline */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_3px)]" />

                            <div className="col-span-4 font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                                {p.name}
                            </div>
                            <div className="col-span-2">
                                <StatusPill status={mapProjectStatusToDisplay(p.status)} className="scale-90 origin-left" showLabel={false} />
                                <span className="ml-2 text-xs text-text-muted">{p.version}</span>
                            </div>
                            <div className="col-span-2 text-text-muted text-xs">
                                {p.lastPush}
                            </div>
                            <div className="col-span-1 text-text-muted text-xs">
                                {p.size}
                            </div>
                            <div className="col-span-3 flex justify-end gap-1 flex-wrap">
                                {p.tags.slice(0, 2).map(t => (
                                    <span key={t} className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-text-muted">
                                        #{t}
                                    </span>
                                ))}
                                {p.tags.length > 2 && <span className="text-[10px] text-text-muted">+{p.tags.length - 2}</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Manifest Side Drawer */}
            <AnimatePresence mode='wait'>
                {selectedProject && (
                    <motion.div
                        key="drawer"
                        initial={{ opacity: 0, width: 0, x: 20 }}
                        animate={{ opacity: 1, width: 320, x: 0 }}
                        exit={{ opacity: 0, width: 0, x: 20 }}
                        className="h-full border border-white/10 bg-[#0f1117]/90 backdrop-blur-xl rounded-lg overflow-hidden flex flex-col shadow-2xl sticky top-32"
                    >
                        {/* Drawer Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                            <span className="text-xs font-bold text-cyan-400">PACKAGE MANIFEST</span>
                            <button onClick={() => setSelectedProject(null)} className="text-text-muted hover:text-white">x</button>
                        </div>

                        {/* Drawer Content */}
                        <div className="p-6 flex-1 overflow-y-auto font-mono text-xs space-y-6">
                            <div>
                                <h3 className="text-white text-lg font-bold mb-1">{selectedProject.name}</h3>
                                <p className="text-text-muted leading-relaxed">{selectedProject.description}</p>
                            </div>

                            <div>
                                <span className="block text-slate-500 mb-2 uppercase tracking-wider">Coordinates</span>
                                <div className="p-3 bg-black/40 rounded border border-white/5 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">ID:</span>
                                        <span className="text-white">{selectedProject.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Build:</span>
                                        <span className="text-white">{selectedProject.version}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Size:</span>
                                        <span className="text-white">{selectedProject.size}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="block text-slate-500 mb-2 uppercase tracking-wider">Metadata</span>
                                <pre className="p-3 bg-black/40 rounded border border-white/5 text-emerald-400 overflow-x-auto">
                                    {JSON.stringify(selectedProject.details, null, 2)}
                                </pre>
                            </div>

                            <button className="w-full py-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 rounded hover:bg-cyan-500/20 transition-all font-bold">
                                $ PULL IMAGE
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
