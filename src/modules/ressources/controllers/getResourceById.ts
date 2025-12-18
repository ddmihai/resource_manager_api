import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { ResourceService } from '../services/ressource.service';


export const getResourceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get resource By Id
        const { id } = req.params;
        const resource = await ResourceService.GetResourceById(id);

        return res.status(200).json({
            status: 'success',
            data: resource,
        });
    }
    catch (error) {
        logger.error(error);
        next(error);
    }
}