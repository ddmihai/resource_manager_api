import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { ResourceService } from '../services/resource.service';


export const editResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // decostruct id from params
        const { id } = req.params;

        // get all resources from service
        const resource = await ResourceService.GetResourceById(id);

        res.status(200).json({
            status: 'success',
            data: resource,
        });
    }
    catch (error) {
        logger.error('Error fetching resources:', error);
        next(error);
    }
};