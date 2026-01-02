"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOwnershipStorage = void 0;
const logger_1 = require("../../../utils/logger");
const storageOwnership_service_1 = require("../services/storageOwnership.service");
const createOwnershipStorage = async (req, res, next) => {
    try {
        // Extract data from request body
        const { companyId, locationId, bluePrintId } = req.body;
        const ownerId = req.user._id;
        // Call the service to create ownership storage
        const newStorageOwnership = await storageOwnership_service_1.StorageOwnershipService.CreateOwnership({ ownerId, companyId, locationId, bluePrintId });
        res.status(201).json({ success: true, data: newStorageOwnership });
    }
    catch (error) {
        logger_1.logger.error("Error in createOwnershipStorage controller:", error);
        next(error);
    }
};
exports.createOwnershipStorage = createOwnershipStorage;
//# sourceMappingURL=createOwnershipStorage.js.map