import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { $systemStatus, initSystemMonitor } from '../../stores/systemStore';
import { StatusPill, type StatusType } from '../ui/StatusPill';

export default function StatusWidget() {
  const system = useStore($systemStatus);

  useEffect(() => {
    // Ensure monitor is running if this widget is present
    const cleanup = initSystemMonitor();
    return cleanup;
  }, []);

  const mapStatus = (s: string): StatusType => {
    if (s === 'healthy') return 'operational';
    if (s === 'degraded') return 'degraded';
    if (s === 'offline') return 'outage';
    return 'cold-start';
  };

  return (
    <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-3 py-1.5 shadow-sm">
      <StatusPill status={mapStatus(system.status)} showLabel={false} />
      
      <div className="hidden items-center gap-3 text-xs font-mono text-text-muted sm:flex">
        <span>CPU: <span className="text-text-primary">{system.cpu}%</span></span>
        <span className="h-3 w-px bg-border" />
        <span>MEM: <span className="text-text-primary">{system.memory}%</span></span>
      </div>
    </div>
  );
}
