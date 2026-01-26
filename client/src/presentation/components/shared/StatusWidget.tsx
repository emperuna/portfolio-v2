import { useSystemStatus } from '@application/hooks';
import { mapSystemHealthToDisplay } from '@domain';
import { StatusPill } from '../ui/StatusPill';

export default function StatusWidget() {
  const system = useSystemStatus();

  return (
    <div className="flex items-center gap-3 rounded-full border border-border bg-surface px-3 py-1.5 shadow-sm">
      <StatusPill status={mapSystemHealthToDisplay(system.status)} showLabel={false} />
      
      <div className="hidden items-center gap-3 text-xs font-mono text-text-muted sm:flex">
        <span>CPU: <span className="text-text-primary">{system.cpu}%</span></span>
        <span className="h-3 w-px bg-border" />
        <span>MEM: <span className="text-text-primary">{system.memory}%</span></span>
      </div>
    </div>
  );
}
