import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $systemStatus, initSystemMonitor } from '../state/systemStore';

export function useSystemStatus(options: { autoStart?: boolean } = {}) {
  const { autoStart = true } = options;
  const status = useStore($systemStatus);

  useEffect(() => {
    if (!autoStart) return;
    const cleanup = initSystemMonitor();
    return cleanup;
  }, [autoStart]);

  return status;
}
