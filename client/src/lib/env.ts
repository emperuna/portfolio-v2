export function getApiBaseUrl() {
  return import.meta.env.PUBLIC_API_URL || 'http://localhost:5000';
}
