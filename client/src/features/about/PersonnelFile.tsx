import { motion } from 'framer-motion';

export function PersonnelFile() {
    return (
        <div className="h-full flex flex-col font-mono text-sm bg-[#0d0d0d]">
           {/* Header Line */}
            <div className="flex bg-white/5 border-b border-white/10 text-xs font-bold tracking-wider">
                <div className="flex-1 py-2 px-4 bg-emerald-900/40 text-emerald-400 border-b-2 border-emerald-500">
                    [ PERSONNEL_DOSSIER ]
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-3xl mx-auto space-y-10"
                >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-start gap-8 border-b border-white/10 pb-8">
                        {/* Dossier Photo Placeholder */}
                        <div className="w-32 h-40 shrink-0 bg-[#08080a] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                           {/* Scanline overlay over photo box */}
                           <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] z-10 pointer-events-none"></div>
                           <div className="w-12 h-12 opacity-20 group-hover:opacity-40 transition-opacity">
                               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                           </div>
                           <span className="text-white/20 text-[8px] uppercase mt-4 tracking-widest relative z-20">VISUAL_REDACTED</span>
                        </div>

                        {/* Identity Block */}
                        <div className="flex-1 space-y-2 w-full">
                            <div className="text-emerald-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-4 bg-emerald-500/10 inline-flex items-center gap-2 px-3 py-1.5 border border-emerald-500/20 rounded-sm">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                DATA_SUBJECT_VERIFIED
                            </div>
                            
                            <div className="text-primary font-bold text-xs tracking-widest uppercase mb-6 border-b border-white/5 pb-2 w-max">
                                Software Engineer / DevOps
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs font-mono bg-[#08080a] p-4 border border-white/5 rounded-sm shadow-inner">
                                <div className="flex justify-between sm:justify-start sm:gap-4"><span className="text-white/30 w-24">SUBJECT_ID:</span><span className="text-white/80">JG-808</span></div>
                                <div className="flex justify-between sm:justify-start sm:gap-4"><span className="text-white/30 w-24">BASE:</span><span className="text-white/80">Laguna, PH</span></div>
                                <div className="flex justify-between sm:justify-start sm:gap-4"><span className="text-white/30 w-24">UNIT STATUS:</span><span className="text-emerald-400 font-bold flex items-center gap-2">ACTIVE</span></div>
                                <div className="flex justify-between sm:justify-start sm:gap-4"><span className="text-white/30 w-24">SPECIALTY:</span><span className="text-white/80 shrink-0">Automation / Infra</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Philosophy */}
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase w-max">01 // Operational Philosophy</div>
                            <div className="flex-grow h-px bg-white/10"></div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed font-sans max-w-2xl text-justify border-l-2 border-primary/30 pl-4 py-1">
                            I treat web applications as critical infrastructure. My focus is designing reliable systems and automated CI/CD pipelines so deployments are boring, not stressful.
                        </p>
                    </div>

                    {/* Official Training */}
                    <div>
                         <div className="flex items-center gap-4 mb-4">
                            <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase w-max">02 // Official Training</div>
                            <div className="flex-grow h-px bg-white/10"></div>
                        </div>
                         <div className="space-y-4 text-sm mt-4 bg-white/5 border border-white/5 p-4 rounded-sm">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline group gap-2">
                                <div>
                                    <div className="text-white font-bold group-hover:text-primary transition-colors uppercase tracking-wider">Laguna State Polytechnic University</div>
                                    <div className="text-slate-400 text-xs mt-1">Bachelor of Science in Computer Science</div>
                                </div>
                                <div className="text-primary/70 text-xs font-mono font-bold border border-primary/20 bg-primary/10 px-2 py-0.5 pointer-events-none">
                                    IN_PROGRESS [2027]
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* Communication Protocols */}
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase w-max">03 // Communication Protocols</div>
                            <div className="flex-grow h-px bg-white/10"></div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
                            <a href="https://github.com/emperuna" target="_blank" className="px-4 py-2 bg-[#0a0a0c] hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-all flex items-center gap-2 group">
                                <span className="text-primary group-hover:text-emerald-400 transition-colors"></span> GITHUB_NODE
                            </a>
                            <a href="https://www.linkedin.com/in/jeremy-garin-b9299036a/" target="_blank" className="px-4 py-2 bg-[#0a0a0c] hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-all flex items-center gap-2 group">
                                <span className="text-primary group-hover:text-emerald-400 transition-colors"></span> LINKEDIN_NODE
                            </a>
                            <a href="mailto:garinjeremy@gmail.com" className="px-4 py-2 bg-[#0a0a0c] hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-all flex items-center gap-2 group">
                                <span className="text-primary group-hover:text-emerald-400 transition-colors"></span> INITIATE_EMAIL
                            </a>
                        </div>
                    </div>

                </motion.div>
            </div>
            
            {/* Command Line Footer */}
            <div className="p-2 border-t border-white/20 text-xs text-slate-500 flex justify-between bg-[#08080a]">
                <div>
                    <span className="text-emerald-500 mr-2">~</span> 
                    <span className="text-white font-bold">"personnel_file.md"</span> [READONLY] 108L, 3426C written
                </div>
            </div>
        </div>
    );
}
