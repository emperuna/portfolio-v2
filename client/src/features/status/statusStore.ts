import { atom } from 'nanostores';
import type { SystemStatus } from '@lib/types';
import { normalizeSystemHealth } from '@lib/utils';
import { getSystemStatus } from '@lib/api';

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
      const current = $systemStatus.get();
      $systemStatus.set({
        ...current,
        status: 'offline',
      });
    }
  };

  fetchStatus();

  intervalId = setInterval(fetchStatus, 1000);

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
