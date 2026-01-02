import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { StorageOwnershipService } from '../services/storageOwnership.service';



export const createOwnershipStorage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract data from request body
        const { companyId, locationId, bluePrintId } = req.body;
        const ownerId = (req as any).user._id;

        // Call the service to create ownership storage
        const newStorageOwnership = await StorageOwnershipService.CreateOwnership({ ownerId, companyId, locationId, bluePrintId });
        res.status(201).json({ success: true, data: newStorageOwnership });
    }

    catch (error) {
        logger.error("Error in createOwnershipStorage controller:", error);
        next(error);
    }
};