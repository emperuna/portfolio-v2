import { fetchAPI } from '../http/apiClient';
import type { SystemStatusResponse } from '@domain/contracts/systemApi';

export async function getSystemStatus(): Promise<SystemStatusResponse> {
  return fetchAPI('/api/status');
}
