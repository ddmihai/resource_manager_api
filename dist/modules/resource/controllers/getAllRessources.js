"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRessources = void 0;
const logger_1 = require("../../../utils/logger");
const resource_service_1 = require("../services/resource.service");
const getAllRessources = async (req, res, next) => {
    try {
        // get all resources from service
        const resources = await resource_service_1.ResourceService.GetAllResources();
        res.status(200).json({
            status: 'success',
            data: resources,
        });
    }
    catch (error) {
        logger_1.logger.error('Error fetching resources:', error);
        next(error);
    }
};
exports.getAllRessources = getAllRessources;
//# sourceMappingURL=getAllRessources.js.map