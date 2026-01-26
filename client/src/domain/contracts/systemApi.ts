export interface SystemStatusResponse {
  status: string;
  system?: {
    cpu?: number;
    memory?: number;
    uptime_seconds?: number;
  };
}
