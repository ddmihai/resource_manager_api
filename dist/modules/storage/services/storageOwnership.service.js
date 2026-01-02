"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageOwnershipService = void 0;
exports.createKeyGuard = createKeyGuard;
const mongoose_1 = require("mongoose");
const errorHandler_1 = require("../../../middleware/errorHandler");
const StorageOwnership_model_1 = require("../models/StorageOwnership.model");
const storage_service_1 = require("./storage.service");
const Company_services_1 = require("../../company/services/Company.services");
// Helpers
function createKeyGuard(keys) {
    return (prop) => keys.includes(prop);
}
// Service layer for StorageOwnership
exports.StorageOwnershipService = {
    async GetStorageById(id) {
        if (typeof id === "string" && !mongoose_1.Types.ObjectId.isValid(id)) {
            throw new errorHandler_1.ApiError("Invalid id", 400);
        }
        const storage = await StorageOwnership_model_1.StorageOwnership.findById(id).lean();
        if (!storage)
            throw new errorHandler_1.ApiError("Storage not found", 404);
        const blueprint = await storage_service_1.StorageBlueprintService.GetStorageByKey(storage.bluePrintId.toString());
        if (!blueprint)
            throw new errorHandler_1.ApiError("Storage blueprint missing (data inconsistency)", 500);
        return {
            ...storage,
            blueprint,
        };
    },
    // create ownership
    async CreateOwnership({ ownerId, companyId, locationId, bluePrintId }) {
        /**
         *    Validate blueprint existence
         */
        if (!mongoose_1.Types.ObjectId.isValid(bluePrintId)) {
            throw new errorHandler_1.ApiError("Invalid blueprint id", 400);
        }
        ;
        const blueprint = await storage_service_1.StorageBlueprintService.GetStorageById(bluePrintId.toString());
        if (!blueprint) {
            throw new errorHandler_1.ApiError("Storage blueprint not found", 404);
        }
        ;
        /**
         *    Validate location and company id
         */
        if (!mongoose_1.Types.ObjectId.isValid(companyId)) {
            throw new errorHandler_1.ApiError("Invalid company id", 400);
        }
        ;
        if (!mongoose_1.Types.ObjectId.isValid(locationId)) {
            throw new errorHandler_1.ApiError("Invalid location id", 400);
        }
        ;
        /**
         *      Check if the company is real
         */
        const existingComapny = await Company_services_1.CompanyServices.GetAllUserCompanies(ownerId.toString());
        const companyIds = existingComapny.map((c) => c._id.toString());
        if (!companyIds.includes(companyId.toString())) {
            throw new errorHandler_1.ApiError("Company not found or you don't have access to it", 403);
        }
        const newOwnership = new StorageOwnership_model_1.StorageOwnership({
            companyId,
            locationId,
            bluePrintId,
            // initial state
            capacity: blueprint.capacityUnit,
            storedAmount: 0,
            connectedProducers: [],
            condition: 100
        });
        return await newOwnership.save();
    }
};
//# sourceMappingURL=storageOwnership.service.js.map