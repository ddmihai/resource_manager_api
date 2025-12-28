"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editResource = void 0;
const logger_1 = require("../../../utils/logger");
const resource_service_1 = require("../services/resource.service");
const editResource = async (req, res, next) => {
    try {
        const resourceId = req.body.id;
        const updateData = req.body;
        console.log(req.body);
        const resource = await resource_service_1.ResourceService.EditResource(resourceId, updateData);
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
exports.editResource = editResource;
//# sourceMappingURL=editResource.js.map