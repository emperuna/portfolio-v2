import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import type { DisplayStatus } from '@domain';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatusPillProps {
  status: DisplayStatus;
  className?: string;
  showLabel?: boolean;
}

export function StatusPill({ status, className, showLabel = true }: StatusPillProps) {
  const styles = {
    operational: 'border-success/30 bg-success/10 text-success shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    degraded: 'border-warning/30 bg-warning/10 text-warning shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    outage: 'border-danger/30 bg-danger/10 text-danger shadow-[0_0_10px_rgba(239,68,68,0.2)]',
    'cold-start': 'border-border bg-surface text-text-muted',
  };

  const labels = {
    operational: 'SYSTEM ONLINE',
    degraded: 'DEGRADED',
    outage: 'OFFLINE',
    'cold-start': 'INITIALIZING',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-widest',
        styles[status],
        className
      )}
    >
      <span className={cn("relative flex h-1.5 w-1.5", status === 'operational' && "animate-pulse")}>
        <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current"></span>
      </span>
      {showLabel && labels[status]}
    </div>
  );
}
