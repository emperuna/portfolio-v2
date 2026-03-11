import { getApiBaseUrl } from './env';
import type { SystemStatusResponse, SystemConfig, SystemMeta } from './types';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${getApiBaseUrl()}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

export async function getSystemStatus(): Promise<SystemStatusResponse> {
  return fetchAPI('/api/status');
}

export async function getSystemConfig(): Promise<SystemConfig> {
  const response = await fetchAPI('/api/config');
  return response.config;
}

export async function getSystemMeta(): Promise<SystemMeta> {
  return fetchAPI('/api/meta');
}

export async function updateSystemConfig(config: Partial<SystemConfig>): Promise<SystemConfig> {
  const response = await fetchAPI('/api/config', {
    method: 'POST',
    body: JSON.stringify(config),
  });
  return response.config;
}
