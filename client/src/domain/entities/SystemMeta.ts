export interface SystemMeta {
    version: string;
    commit: string;
    environment: string;
    build_time: string;
    uptime_seconds: number;
    cold_start: boolean;
}
