import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { ResourceService } from '../services/resource.service';


export const editResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId = req.body.id;
        const updateData = req.body;

        console.log(req.body);

        const resource = await ResourceService.EditResource(resourceId, updateData);

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