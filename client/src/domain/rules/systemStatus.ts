import type { DisplayStatus, SystemHealth } from '../entities/systemStatus';

export function mapSystemHealthToDisplay(status: SystemHealth): DisplayStatus {
  switch (status) {
    case 'healthy':
      return 'operational';
    case 'degraded':
      return 'degraded';
    case 'offline':
      return 'outage';
    default:
      return 'cold-start';
  }
}

export function normalizeSystemHealth(input: unknown): SystemHealth {
  if (input === 'healthy' || input === 'degraded' || input === 'offline') {
    return input;
  }
  if (input === 'operational') {
    return 'healthy';
  }
  return 'offline';
}
