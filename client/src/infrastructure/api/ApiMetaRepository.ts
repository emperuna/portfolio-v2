import { fetchAPI } from '../http/apiClient';
import type { SystemMeta } from '@domain/entities/SystemMeta';

export class ApiMetaRepository {
    async getMeta(): Promise<SystemMeta> {
        return fetchAPI('/api/meta');
    }
}
