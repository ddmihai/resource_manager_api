"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResource = void 0;
const logger_1 = require("../../../utils/logger");
const resource_service_1 = require("../services/resource.service");
const createResource = async (req, res, next) => {
    try {
        // get all resources from service
        const resource = await resource_service_1.ResourceService.CreateResource({
            name: req.body.name,
            description: req.body.description,
            isRaw: req.body.isRaw,
            pricePerUnit: req.body.pricePerUnit,
            basePricePerUnit: req.body.basePricePerUnit,
            unitOfMeasurement: req.body.unitOfMeasurement,
            image: req.body.image,
        }, false);
        res.status(201).json({
            message: 'Resource created successfully',
            data: resource,
        });
    }
    catch (error) {
        logger_1.logger.error('Error fetching resources:', error);
        next(error);
    }
};
exports.createResource = createResource;
//# sourceMappingURL=createResource.js.map