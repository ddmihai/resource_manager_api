import mongoose from "mongoose";
import { ICompanyModel } from "../interfaces/company";
import { Company } from "../models/company.model";
import { UserService } from "../../users/services/User.service";
import { ApiError } from "../../../middleware/errorHandler";



interface CreateCompanyDTO {
    name: string;
    description?: string;
    locationId: string;
    industryId: string;
    ownerId: string;
}




export const CompanyServices = {

    // count all companies that user owns
    async CountCompaniesByOwnerId(ownerId: string): Promise<number> {
        return await Company.countDocuments({ ownerId });
    },


    async GetAllUserCompanies(ownerId: string): Promise<ICompanyModel[] | []> {
        return await Company.find({ ownerId });
    },


    // create a new company
    async CreateCompany({ name, locationId, description, industryId, ownerId, }: CreateCompanyDTO): Promise<ICompanyModel | null> {
        // validate + confirm owner exists
        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            throw new ApiError("Invalid owner ID", 400);
        }
        const realUser = await UserService.FindUserById(ownerId);
        if (!realUser) {
            throw new ApiError("Owner user not found", 400);
        }

        // validate locationId
        if (!mongoose.Types.ObjectId.isValid(locationId)) {
            throw new ApiError("Invalid location ID", 400);
        }

        // validate industryId
        if (!mongoose.Types.ObjectId.isValid(industryId)) {
            throw new ApiError("Invalid industry ID", 400);
        }

        // normalize name
        const normalizedName = name.trim().toLowerCase();
        if (normalizedName.length < 5 || normalizedName.length > 100) {
            throw new ApiError("Company name must be between 5 and 100 characters long", 400);
        }

        // establish the capital if the user is its first company
        const existingCompaniesCount = await this.CountCompaniesByOwnerId(ownerId);
        const initialCapital = existingCompaniesCount === 0 ? 10_000_000 : 5_000;

        // shares + valuation (integer-only share price)
        const totalShares = 1_000;
        const companyShareValue = Math.floor(initialCapital / totalShares);

        // 30% of shares available day 1 (must be an integer)
        const availableShares = Math.floor(totalShares * 0.3);

        // tax stored as percent 0..100
        const tax = existingCompaniesCount === 0 ? 30 : 25;

        try {
            const newCompany = await Company.create({
                name: normalizedName,
                locationId,
                industryId,
                ownerId,
                capital: initialCapital,
                companyShareValue,
                tax,
                description,
                totalShares,
                availableShares,
            });

            return newCompany;
        } catch (err: any) {
            // Handle unique index violation (ownerId + name)
            if (err?.code === 11000) {
                throw new ApiError("You already have a company with this name", 409);
            }
            throw err;
        }
    },
}