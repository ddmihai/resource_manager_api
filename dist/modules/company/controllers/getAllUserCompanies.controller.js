"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCompanies = void 0;
const logger_1 = require("../../../utils/logger");
const Company_services_1 = require("../services/Company.services");
const getUserCompanies = async (req, res, next) => {
    try {
        const ownerId = req.user._id.toString();
        const companies = await Company_services_1.CompanyServices.GetAllUserCompanies(ownerId);
        return res.status(200).json({ companies });
    }
    catch (error) {
        logger_1.logger.error("Error in getUserCompanies controller:", error);
        next(error);
    }
};
exports.getUserCompanies = getUserCompanies;
//# sourceMappingURL=getAllUserCompanies.controller.js.map