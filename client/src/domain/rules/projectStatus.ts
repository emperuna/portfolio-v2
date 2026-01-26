import type { DisplayStatus } from '../entities/systemStatus';
import type { ProjectStatus } from '../entities/project';

export function mapProjectStatusToDisplay(status: ProjectStatus): DisplayStatus {
  switch (status) {
    case 'live':
      return 'operational';
    case 'developing':
      return 'degraded';
    case 'maintenance':
      return 'outage';
    default:
      return 'cold-start';
  }
}
