export type SystemHealth = 'healthy' | 'degraded' | 'offline';

export type DisplayStatus = 'operational' | 'degraded' | 'outage' | 'cold-start';

export interface SystemStatus {
  cpu: number;
  memory: number;
  status: SystemHealth;
  latency_ms: number;
}

export type ProjectStatus = 'live' | 'archived' | 'maintenance' | 'developing';

export interface SystemConfig {
  debug_mode: boolean;
  traffic_level: 'low' | 'high' | 'surge';
  sim_mode: 'standard' | 'maintenance' | 'offline';
}

export interface SystemMeta {
  version: string;
  commit: string;
  environment: string;
  build_time: string;
  uptime_seconds: number;
  cold_start: boolean;
}

export interface SystemStatusResponse {
  status: string;
  system?: {
    cpu?: number;
    memory?: number;
    uptime_seconds?: number;
  };
}
