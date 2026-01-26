import { atom } from 'nanostores';
import type { SystemStatus } from '@domain';
import { normalizeSystemHealth } from '@domain';
import { getSystemStatus } from '@infrastructure/api/systemApi';

export const $systemStatus = atom<SystemStatus>({
  cpu: 0,
  memory: 0,
  status: 'offline',
});

let intervalId: ReturnType<typeof setInterval> | null = null;
let subscriberCount = 0;

export function initSystemMonitor() {
  subscriberCount += 1;
  if (intervalId) {
    return () => {
      subscriberCount = Math.max(0, subscriberCount - 1);
      if (subscriberCount === 0 && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }

  const fetchStatus = async () => {
    try {
      const data = await getSystemStatus();

      $systemStatus.set({
        cpu: data.system?.cpu || 0,
        memory: data.system?.memory || 0,
        status: normalizeSystemHealth(data.status),
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

  // Poll every 1 second
  intervalId = setInterval(fetchStatus, 1000);

  // Return cleanup function
  return () => {
    subscriberCount = Math.max(0, subscriberCount - 1);
    if (intervalId) {
      if (subscriberCount === 0) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  };
}
