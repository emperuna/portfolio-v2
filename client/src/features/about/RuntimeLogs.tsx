import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import useSWR from 'swr';

interface GitHubCommit {
    id: string;
    time: string;
    level: string;
    msg: string;
    status: string;
    details: string;
    repo: string;
}

const GITHUB_EVENTS_URL = 'https://api.github.com/users/emperuna/events/public';

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 403) throw new Error('RATE_LIMIT');
        throw new Error('FETCH_FAILED');
    }
    const data = await res.json();
    
    // Process and normalize events
    const processedEvents = data
        .filter((event: any) => ['PushEvent', 'PullRequestReviewEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type))
        .map((event: any) => {
            let msg = '';
            let status = 'ACTIVITY';
            let details = `Actor: ${event.actor.login}`;
            let level = 'DEBUG';

            if (event.type === 'PushEvent') {
                const commitCount = event.payload.commits?.length || 0;
                const firstCommitMsg = event.payload.commits?.[0]?.message?.split('\n')[0] || 'Updates';
                msg = commitCount > 1 
                    ? `pushed ${commitCount} commits: ${firstCommitMsg}...` 
                    : `commit: ${firstCommitMsg}`;
                status = 'PUSHED';
                level = 'SUCCESS';
                details = `SHA: ${event.payload.commits?.[0]?.sha?.substring(0, 7) || 'N/A'} | ${details}`;
            } else if (event.type === 'PullRequestReviewEvent') {
                const reviewState = (event.payload.review?.state || event.payload.action).toLowerCase();
                msg = `${reviewState} PR: ${event.payload.pull_request?.title || 'Unknown'}`;
                status = 'REVIEWED';
                level = reviewState === 'approved' ? 'SUCCESS' : 'INFO';
                details = `Action: ${reviewState.toUpperCase()} | ${details}`;
            } else if (event.type === 'CreateEvent') {
                msg = `created ${event.payload.ref_type}: ${event.payload.ref || event.repo.name}`;
                status = 'CREATED';
                level = 'INFO';
            } else if (event.type === 'PullRequestEvent') {
                const isMerged = event.payload.pull_request?.merged;
                const action = isMerged ? 'merged' : event.payload.action;
                msg = `${action} PR: ${event.payload.pull_request?.title || 'Unknown'}`;
                status = isMerged ? 'MERGED' : 'PR_EVENT';
                level = isMerged ? 'SUCCESS' : 'INFO';
            } else if (event.type === 'IssuesEvent') {
                msg = `${event.payload.action} issue: ${event.payload.issue?.title || 'Unknown'}`;
                status = 'ISSUE';
                level = event.payload.action === 'closed' ? 'SUCCESS' : 'INFO';
            }

            return {
                id: event.id,
                time: event.created_at,
                level,
                msg,
                status,
                details,
                repo: event.repo.name,
                rawTime: new Date(event.created_at).getTime()
            };
        });

    // Sort chronologically (newest first) and take top 20
    return processedEvents
        .sort((a: any, b: any) => b.rawTime - a.rawTime)
        .slice(0, 20);
};

export function RuntimeLogs() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const { data: githubLogs, error, isLoading } = useSWR<GitHubCommit[]>(
        GITHUB_EVENTS_URL,
        fetcher,
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000, // 1 minute
        }
    );

    const toggleLog = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const displayLogs = useMemo<GitHubCommit[]>(() => {
        return githubLogs || [];
    }, [githubLogs]);

    const gitError = error?.message === 'RATE_LIMIT' || error?.message === 'FETCH_FAILED';

    return (
        <div className="h-full flex flex-col font-mono text-sm bg-[#0d0d0d]">
            {/* Header */}
            <div className="flex bg-white/5 border-b border-white/10 text-xs font-bold tracking-wider">
                <div className="flex-1 py-2 px-4 bg-emerald-900/40 text-emerald-400 border-b-2 border-emerald-500">
                    [ GITHUB_FIREHOSE ]
                </div>
            </div>

            {/* Status Line */}
            <div className="flex px-2 py-1 text-xs border-b border-white/10 bg-emerald-900/20 text-emerald-400">
                <span>STREAM: LIVE_COMMITS (emperuna)</span>
                <span className="ml-auto opacity-70">
                    {isLoading ? 'CONNECTING...' : '-- INSERT --'}
                </span>
            </div>

            {/* Log Stream */}
            <div className="flex-1 overflow-y-auto p-0 custom-scrollbar">
                {isLoading && (
                    <div className="p-4 text-emerald-500/50 animate-pulse text-xs">
                        Establishing secure connection to api.github.com...<br/>
                        Authenticating payload...<br/>
                        Handshake success. Receiving byte stream...
                    </div>
                )}

                {gitError && (
                    <div className="p-4 text-orange-500 text-xs">
                        [ERR] Failed to connect to GitHub daemon. {error?.message === 'RATE_LIMIT' ? 'Rate limit exceeded.' : 'Host unreachable.'}<br/>
                        Attempting to reconnect...
                    </div>
                )}

                {displayLogs.map((log) => (
                    <div 
                        key={log.id} 
                        onClick={() => toggleLog(log.id)}
                        className={`
                            border-b border-white/[0.05] cursor-pointer group transition-colors
                            ${expandedId === log.id ? 'bg-white/5 border-l-2 border-emerald-500' : 'text-slate-300 hover:bg-white/10 border-l-2 border-transparent'}
                        `}
                    >
                        <div className="flex flex-col sm:flex-row items-start px-2 py-1.5 sm:py-1 gap-1 sm:gap-0">
                            {/* Metadata Row (Stacked on mobile) */}
                            <div className="flex items-center gap-3 sm:contents">
                                {/* Timestamp */}
                                <div className={`text-[10px] sm:text-xs shrink-0 sm:w-32 lg:w-36 ${expandedId === log.id ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {formatDistanceToNow(new Date(log.time), { addSuffix: true })}
                                </div>
                                
                                {/* Level */}
                                <div className={`font-bold text-[10px] sm:text-xs shrink-0 sm:w-16 lg:w-20
                                    ${log.level === 'WARN' ? 'text-orange-400' : 
                                      log.level === 'SUCCESS' ? 'text-emerald-400' :
                                      log.level === 'DEBUG' ? 'text-slate-400' : 'text-cyan-400'}
                                `}>
                                    [{log.level}]
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex-1 min-w-0 w-full">
                                <div className={`truncate text-xs sm:text-sm ${expandedId === log.id ? 'text-white font-bold' : ''}`}>
                                    {log.msg}
                                </div>
                                <AnimatePresence>
                                    {expandedId === log.id && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mt-2 mb-1"
                                        >
                                            <div className="text-xs font-mono pl-4 border-l-2 border-white/20 text-slate-300">
                                                {'repo' in log && (
                                                    <div className="flex flex-col sm:flex-row sm:gap-2 opacity-80 mb-1">
                                                        <span className="shrink-0 text-slate-500 uppercase tracking-tighter sm:tracking-normal">target:</span>
                                                        <span className="text-cyan-400 font-bold break-all">{log.repo}</span>
                                                    </div>
                                                )}
                                                <div className="flex flex-col sm:flex-row sm:gap-2 opacity-80 mb-1">
                                                    <span className="shrink-0 text-slate-500 uppercase tracking-tighter sm:tracking-normal">details:</span>
                                                    <span className="break-words">{log.details}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:gap-2 opacity-80">
                                                    <span className="shrink-0 text-slate-500 uppercase tracking-tighter sm:tracking-normal">status:</span>
                                                    <span className="text-white font-bold">{log.status}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Active Cursor Block */}
                {!isLoading && (
                    <div className="px-2 py-1 animate-pulse w-full h-6 mt-1 bg-emerald-500/50"></div>
                )}
            </div>
            
            {/* Command Line Footer */}
            <div className="p-2 border-t border-white/20 text-xs text-slate-500">
                <span className="text-emerald-500">➜</span> 
                <span className="text-white ml-2">
                    tail -f /github/streams/emperuna
                </span>
            </div>
        </div>
    );
}
