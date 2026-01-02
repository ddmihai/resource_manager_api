"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompany = void 0;
const logger_1 = require("../../../utils/logger");
const Company_services_1 = require("../services/Company.services");
const createCompany = async (req, res, next) => {
    try {
        const { name, description, locationId, industryId } = req.body;
        const ownerId = req.user._id.toString();
        const newCompany = await Company_services_1.CompanyServices.CreateCompany({
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
        logger_1.logger.error("Error in createCompany controller:", error);
        next(error);
    }
};
exports.createCompany = createCompany;
//# sourceMappingURL=createCompany.controller.js.map