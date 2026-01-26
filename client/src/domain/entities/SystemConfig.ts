export interface SystemConfig {
    debug_mode: boolean;
    traffic_level: 'low' | 'high' | 'surge';
    sim_mode: 'standard' | 'maintenance' | 'offline';
}
