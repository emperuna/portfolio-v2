import { map } from 'nanostores';
import { ApiConfigRepository } from '../../infrastructure/api/ApiConfigRepository';
import type { SystemConfig } from '@domain/entities/SystemConfig';

export const $systemConfig = map<SystemConfig>({
    debug_mode: false,
    traffic_level: 'low',
    sim_mode: 'standard'
});

const repository = new ApiConfigRepository();

export async function loadSystemConfig() {
    try {
        const config = await repository.getConfig();
        $systemConfig.set(config);
    } catch (e) {
        console.error("Failed to load config:", e);
    }
}

export function setTrafficLevel(level: SystemConfig['traffic_level']) {
    $systemConfig.setKey('traffic_level', level);
}

export function setDebugMode(debug: boolean) {
    $systemConfig.setKey('debug_mode', debug);
}

export function setSimMode(mode: SystemConfig['sim_mode']) {
    $systemConfig.setKey('sim_mode', mode);
}
