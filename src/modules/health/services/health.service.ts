export interface HealthStatus {
  status: 'ok' | 'down';
  timestamp: string;
}

export const HealthService = {
  getStatus(): HealthStatus {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  },
};
