import { NextFunction, Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import { CompanyServices } from '../services/Company.services';



export const getUserCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ownerId = req.user!._id.toString();
        const companies = await CompanyServices.GetAllUserCompanies(ownerId);
        return res.status(200).json({ companies });
    }

    catch (error) {
        logger.error("Error in getUserCompanies controller:", error);
        next(error);
    }
};