import { NextFunction, Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import { CompanyServices } from '../services/Company.services';



export const createCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description, locationId, industryId } = req.body;
        const ownerId = req.user!._id.toString();

        const newCompany = await CompanyServices.CreateCompany({
            name,
            description,
            locationId,
            industryId,
            ownerId,
        });

        if (!newCompany) {
            return res.status(500).json({
                message: "Failed to create company",
                status: "error",
            });
        }

        return res.status(201).json({ company: newCompany });
    }

    catch (error) {
        logger.error("Error in createCompany controller:", error);
        next(error);
    }
};