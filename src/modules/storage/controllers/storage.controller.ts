import { Request, Response } from 'express';
import { StorageService } from '../services/storage.service';

export const storageController = {
  list(_req: Request, res: Response) {
    const data = StorageService.list();
    res.json(data);
  },
};
