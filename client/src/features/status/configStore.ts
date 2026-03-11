import { map } from 'nanostores';
import { getSystemConfig, updateSystemConfig } from '@lib/api';
import type { SystemConfig } from '@lib/types';

export const $systemConfig = map<SystemConfig>({
    debug_mode: false,
    traffic_level: 'low',
    sim_mode: 'standard'
});

export async function loadSystemConfig() {
    try {
        const config = await getSystemConfig();
        $systemConfig.set(config);
    } catch (e) {
        console.error("Failed to load config:", e);
    }
}

export function setTrafficLevel(level: SystemConfig['traffic_level']) {
    $systemConfig.setKey('traffic_level', level);
    updateSystemConfig({ traffic_level: level }).catch(console.error);
}

export function setDebugMode(debug: boolean) {
    $systemConfig.setKey('debug_mode', debug);
    updateSystemConfig({ debug_mode: debug }).catch(console.error);
}

export function setSimMode(mode: SystemConfig['sim_mode']) {
    $systemConfig.setKey('sim_mode', mode);
    updateSystemConfig({ sim_mode: mode }).catch(console.error);
}
