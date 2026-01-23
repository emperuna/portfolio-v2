import { atom } from 'nanostores';

export type SystemStatus = {
  cpu: number;
  memory: number;
  status: 'healthy' | 'degraded' | 'offline';
};

export const $systemStatus = atom<SystemStatus>({
  cpu: 0,
  memory: 0,
  status: 'offline',
});

let intervalId: ReturnType<typeof setInterval> | null = null;

export function initSystemMonitor() {
  if (intervalId) return;

  const apiUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:5000';

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/status`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      $systemStatus.set({
        cpu: data.system?.cpu || 0,
        memory: data.system?.memory || 0,
        status: 'healthy',
      });
    } catch (error) {
      console.error('Failed to fetch system status:', error);
      // Keep previous values but mark as offline or just update status
      const current = $systemStatus.get();
      $systemStatus.set({
        ...current,
        status: 'offline',
      });
    }
  };

  // Initial fetch
  fetchStatus();

  // Poll every 2 seconds
  intervalId = setInterval(fetchStatus, 2000);

  // Return cleanup function
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}
