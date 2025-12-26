import { Request, Response } from 'express';
import { HealthService } from '../services/health.service';

export const healthController = {
  getStatus(_req: Request, res: Response) {
    const payload = HealthService.getStatus();
    res.json(payload);
  },
};
