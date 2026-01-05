"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStoragesBluePrints = void 0;
const logger_1 = require("../../../utils/logger");
const storage_service_1 = require("../services/storage.service");
const getAllStoragesBluePrints = async (req, res, next) => {
    try {
        const storagesBluePrintList = await storage_service_1.StorageBlueprintService.GetAllStorages();
        return res.status(200).json(storagesBluePrintList);
    }
    catch (error) {
        logger_1.logger.error('Error in getAllStoragesBluePrints controller', error);
        next(error);
    }
};
exports.getAllStoragesBluePrints = getAllStoragesBluePrints;
//# sourceMappingURL=getAllStorages.js.map