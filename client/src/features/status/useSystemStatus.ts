import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $systemStatus, initSystemMonitor } from './statusStore';

export function useSystemStatus() {
  const system = useStore($systemStatus);

  useEffect(() => {
    const cleanup = initSystemMonitor();
    return cleanup;
  }, []);

  return system;
}
