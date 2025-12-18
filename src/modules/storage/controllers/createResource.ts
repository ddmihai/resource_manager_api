import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { ResourceService } from '../services/ressource.service';
import type { IResource } from '../types/storage';


export const createResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as IResource;

        const created = await ResourceService.createResource(payload);

        return res.status(201).json({
            status: 'success',
            message: 'Resource created',
            data: created,
        });

    }
    catch (error) {
        logger.error(error);
        next(error);
    }
};
