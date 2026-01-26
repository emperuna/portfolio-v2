export type SystemHealth = 'healthy' | 'degraded' | 'offline';

export type DisplayStatus = 'operational' | 'degraded' | 'outage' | 'cold-start';

export interface SystemStatus {
  cpu: number;
  memory: number;
  status: SystemHealth;
}
