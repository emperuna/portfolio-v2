import { fetchAPI } from '../http/apiClient';
import type { IConfigRepository } from '@domain/contracts/IConfigRepository';
import type { SystemConfig } from '@domain/entities/SystemConfig';

export class ApiConfigRepository implements IConfigRepository {
    async getConfig(): Promise<SystemConfig> {
        const response = await fetchAPI('/api/config');
        return response.config;
    }
}
