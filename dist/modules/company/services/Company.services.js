"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const company_model_1 = require("../models/company.model");
const User_service_1 = require("../../users/services/User.service");
const errorHandler_1 = require("../../../middleware/errorHandler");
exports.CompanyServices = {
    // count all companies that user owns
    async CountCompaniesByOwnerId(ownerId) {
        return await company_model_1.Company.countDocuments({ ownerId });
    },
    async GetAllUserCompanies(ownerId) {
        return await company_model_1.Company.find({ ownerId });
    },
    // create a new company
    async CreateCompany({ name, locationId, description, industryId, ownerId, }) {
        // validate + confirm owner exists
        if (!mongoose_1.default.Types.ObjectId.isValid(ownerId)) {
            throw new errorHandler_1.ApiError("Invalid owner ID", 400);
        }
        const realUser = await User_service_1.UserService.FindUserById(ownerId);
        if (!realUser) {
            throw new errorHandler_1.ApiError("Owner user not found", 400);
        }
        // validate locationId
        if (!mongoose_1.default.Types.ObjectId.isValid(locationId)) {
            throw new errorHandler_1.ApiError("Invalid location ID", 400);
        }
        // validate industryId
        if (!mongoose_1.default.Types.ObjectId.isValid(industryId)) {
            throw new errorHandler_1.ApiError("Invalid industry ID", 400);
        }
        // normalize name
        const normalizedName = name.trim().toLowerCase();
        if (normalizedName.length < 5 || normalizedName.length > 100) {
            throw new errorHandler_1.ApiError("Company name must be between 5 and 100 characters long", 400);
        }
        // establish the capital if the user is its first company
        const existingCompaniesCount = await this.CountCompaniesByOwnerId(ownerId);
        const initialCapital = existingCompaniesCount === 0 ? 10000000 : 5000;
        // shares + valuation (integer-only share price)
        const totalShares = 1000;
        const companyShareValue = Math.floor(initialCapital / totalShares);
        // 30% of shares available day 1 (must be an integer)
        const availableShares = Math.floor(totalShares * 0.3);
        // tax stored as percent 0..100
        const tax = existingCompaniesCount === 0 ? 30 : 25;
        try {
            const newCompany = await company_model_1.Company.create({
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
        }
        catch (err) {
            // Handle unique index violation (ownerId + name)
            if (err?.code === 11000) {
                throw new errorHandler_1.ApiError("You already have a company with this name", 409);
            }
            throw err;
        }
    },
};
//# sourceMappingURL=Company.services.js.map