import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { ResourceService } from '../services/resource.service';


export const createResource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get all resources from service
        const resource = await ResourceService.CreateResource({
            name: req.body.name,
            description: req.body.description,
            isRaw: req.body.isRaw,
            pricePerUnit: req.body.pricePerUnit,
            basePricePerUnit: req.body.basePricePerUnit,
            unitOfMeasurement: req.body.unitOfMeasurement,
            image: req.body.image,
        }, false);

        res.status(201).json({
            message: 'Resource created successfully',
            data: resource,
        });
    }
    catch (error) {
        logger.error('Error fetching resources:', error);
        next(error);
    }
};