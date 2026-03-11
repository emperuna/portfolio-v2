import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { DisplayStatus, SystemHealth, ProjectStatus } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function mapProjectStatusToDisplay(status: ProjectStatus): DisplayStatus {
  switch (status) {
    case 'live':
      return 'operational';
    case 'developing':
      return 'degraded';
    case 'maintenance':
      return 'outage';
    default:
      return 'cold-start';
  }
}
