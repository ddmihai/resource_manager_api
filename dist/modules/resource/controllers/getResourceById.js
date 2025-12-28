"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceById = void 0;
const logger_1 = require("../../../utils/logger");
const resource_service_1 = require("../services/resource.service");
const getResourceById = async (req, res, next) => {
    try {
        // decostruct id from params
        const { id } = req.params;
        // get all resources from service
        const resource = await resource_service_1.ResourceService.GetResourceById(id);
        res.status(200).json({
            status: 'success',
            data: resource,
        });
    }
    catch (error) {
        logger_1.logger.error('Error fetching resources:', error);
        next(error);
    }
};
exports.getResourceById = getResourceById;
//# sourceMappingURL=getResourceById.js.map