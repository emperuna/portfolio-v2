import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../shared/utils';
import { TypewriterLog } from './TypewriterLog';

interface LogEntry {
  id: string;
  text: string;
  type: 'command' | 'output' | 'info';
}

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', text: 'user@devops:~$ init system', type: 'command' },
  { id: '2', text: '> System initialized.', type: 'output' },
  { id: '3', text: '> Waiting for input...', type: 'info' },
];

export function HeroTerminal({ className }: { className?: string }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [queue, setQueue] = useState<LogEntry[]>(INITIAL_LOGS);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Process Queue
  useEffect(() => {
    if (queue.length > 0) { 
        const timer = setTimeout(() => {
            const nextLog = queue[0];
            setLogs(prev => {
                const newLogs = [...prev, nextLog];
                if (newLogs.length > 8) {
                    return newLogs.slice(newLogs.length - 8);
                }
                return newLogs;
            });
            setQueue(prev => prev.slice(1));
        }, 500); // Delay before starting next line
        return () => clearTimeout(timer);
    }
  }, [queue, logs.length]);

  // Infinite Random Logs Generator
  useEffect(() => {
    if (queue.length === 0) {
        const interval = setInterval(() => {
            const commands = [
                'checking status...',
                'ping 127.0.0.1',
                'deploying module...',
                'optimizing assets',
                'analyzing network flow',
                'updating registry'
            ];
            const randomCmd = commands[Math.floor(Math.random() * commands.length)];
            
            const newLog: LogEntry = {
                id: Date.now().toString(),
                text: `> ${randomCmd}`,
                type: 'info'
            };
            setQueue(prev => [...prev, newLog]);
        }, 3000);
        return () => clearInterval(interval);
    }
  }, [queue.length]);

  return (
    <div className={cn(
      "w-full max-w-sm rounded-lg border border-white/10 bg-[#0f1117]/90 font-mono text-xs backdrop-blur-md shadow-2xl",
      className
    )}>
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/5 px-4 py-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
        <span className="ml-2 text-text-muted opacity-50">terminal.exe</span>
      </div>
      <div ref={scrollRef} className="flex flex-col gap-1 p-4 h-64 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <AnimatePresence mode='popLayout'>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "font-mono",
                log.type === 'command' && "text-primary",
                log.type === 'output' && "text-success",
                log.type === 'info' && "text-text-muted"
              )}
            >
              <TypewriterLog text={log.text} />
            </motion.div>
          ))}
          <motion.div
            layoutId="cursor"
            className="h-4 w-2 bg-primary animate-pulse"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
