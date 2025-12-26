import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { ResourceService } from '../services/resource.service';


export const getAllRessources = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get all resources from service
        const resources = await ResourceService.GetAllResources();
        res.status(200).json({
            status: 'success',
            data: resources,
        });
    }
    catch (error) {
        logger.error('Error fetching resources:', error);
        next(error);
    }
};