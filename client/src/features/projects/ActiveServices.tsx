import { useState } from 'react';
import useSWR from 'swr';
import { formatDistanceToNow } from 'date-fns';

interface Repository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    updated_at: string;
    language: string | null;
    stargazers_count: number;
    fork: boolean;
}

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('FETCH_FAILED');
    const data: Repository[] = await res.json();
    
    // Filter out forks and sort by recently updated
    return data
        .filter(repo => !repo.fork)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
};

const ITEMS_PER_PAGE = 6;

export function ActiveServices() {
    const [page, setPage] = useState(1);

    const { data: repos, error, isLoading } = useSWR<Repository[]>(
        'https://api.github.com/users/emperuna/repos?per_page=100',
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 300000, // 5 minutes
        }
    );

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs">
                [ERR] FAILED TO ESTABLISH UPLINK WITH GITHUB_API. RETRYING...
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 w-full bg-white/5 animate-pulse rounded-sm border border-white/5"></div>
                ))}
            </div>
        );
    }

    if (!repos || repos.length === 0) return null;

    const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE);
    const paginatedRepos = repos.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col gap-2 font-mono text-sm">
            {/* Header Row */}
            <div className="grid grid-cols-[1fr_80px_100px] md:grid-cols-[2fr_1fr_80px_120px] gap-4 px-4 py-2 text-[10px] text-white/30 uppercase tracking-widest border-b border-white/10 select-none">
                <div>SERVICE_ID</div>
                <div className="hidden md:block">TECH_STACK</div>
                <div className="text-right">RATING</div>
                <div className="text-right">LAST_SYNC</div>
            </div>

            {/* Service Rows */}
            <div className="min-h-[360px] flex flex-col gap-2">
                {paginatedRepos.map(repo => (
                    <a 
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid grid-cols-[1fr_80px_100px] md:grid-cols-[2fr_1fr_80px_120px] gap-4 px-4 py-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.02] hover:border-white/10 transition-colors items-center group cursor-pointer"
                    >
                        {/* ID & Desc */}
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:animate-pulse"></span>
                                <span className="text-cyan-400 font-bold truncate group-hover:text-cyan-300 transition-colors">
                                    {repo.name}
                                </span>
                            </div>
                            <div className="text-[10px] text-primary/50 truncate font-sans">
                                {repo.description || 'No operational description provided.'}
                            </div>
                        </div>

                        {/* Language */}
                        <div className="hidden md:flex items-center">
                            {repo.language ? (
                            <span className="px-2 py-0.5 text-[9px] bg-white/5 text-slate-300 border border-white/10 rounded-sm">
                                {repo.language.toUpperCase()}
                            </span>
                            ) : (
                            <span className="text-[9px] text-white/20">UNKNOWN</span>
                            )}
                        </div>

                        {/* Stars */}
                        <div className="text-right text-[10px] text-yellow-500 flex items-center justify-end gap-1">
                            ★ {repo.stargazers_count}
                        </div>

                        {/* Updated At */}
                        <div className="text-right text-[10px] text-slate-500">
                            {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                        </div>
                    </a>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 text-xs">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className={`px-4 py-2 border transition-colors ${page === 1 ? 'border-white/5 text-white/20 cursor-not-allowed' : 'border-white/20 text-slate-300 hover:bg-white/10'}`}
                    >
                        ← PREV
                    </button>
                    <div className="text-white/40 tracking-widest text-[10px]">
                        PAGE {page} OF {totalPages}
                    </div>
                    <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className={`px-4 py-2 border transition-colors ${page === totalPages ? 'border-white/5 text-white/20 cursor-not-allowed' : 'border-white/20 text-slate-300 hover:bg-white/10'}`}
                    >
                        NEXT →
                    </button>
                </div>
            )}
        </div>
    );
}
