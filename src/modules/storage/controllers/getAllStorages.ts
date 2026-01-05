import { NextFunction, Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import { StorageBlueprintService } from '../services/storage.service';
import { IStorageBlueprint } from '../interface/storage';



export const getAllStoragesBluePrints = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const storagesBluePrintList = await StorageBlueprintService.GetAllStorages();
        return res.status(200).json(storagesBluePrintList);

    }

    catch (error) {
        logger.error('Error in getAllStoragesBluePrints controller', error);
        next(error);
    }
}