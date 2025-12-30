"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageBlueprintService = void 0;
exports.assertEnumValue = assertEnumValue;
const errorHandler_1 = require("../../../middleware/errorHandler");
const resource_1 = require("../../resource/interfaces/resource");
const storageType_enum_1 = require("../interface/storageType.enum");
const StorageBluePrint_model_1 = require("../models/StorageBluePrint.model");
function assertEnumValue(enumObject, value, errorMessage = 'Invalid enum value') {
    if (!Object.values(enumObject).includes(value)) {
        throw new errorHandler_1.ApiError(errorMessage, 400);
    }
}
exports.StorageBlueprintService = {
    // Get all storage blueprints
    async GetAllStorages() {
        const allStorages = await StorageBluePrint_model_1.StorageBlueprintModel.find().lean();
        return {
            message: 'List of all storage blueprints',
            items: allStorages
        };
    },
    // get storage by unic key
    async GetStorageByKey(key) {
        const storage = await StorageBluePrint_model_1.StorageBlueprintModel.findOne({ key }).lean();
        return storage || null;
    },
    /**
   * Creates a new storage blueprint (catalog definition) in the system.
   *
   * A storage blueprint represents a global, reusable definition of a storage type
   * (e.g. warehouse, silo, battery) and is NOT owned by a specific user.
   *
   * This method:
   * - Ensures the blueprint key is unique
   * - Validates enum values (StorageType, UnitOfMeasurement)
   * - Ensures capacity rules and compatibility rules are respected
   * - Normalizes string fields
   * - Validates numeric and economic constraints
   * - Persists the blueprint in the database
   *
   * @param {IStorageBlueprint} data
   * The storage blueprint data to be created. This should define the global
   * characteristics of the storage type, such as capacity rules, compatibility,
   * costs, and maintenance thresholds.
   *
   * @returns {Promise<IStorageBlueprint>}
   * The newly created storage blueprint as a plain object.
   *
   * @throws {ApiError}
   * Throws an ApiError with status 400 if validation fails or the blueprint key
   * already exists.
   */
    async CreateStorage(data, isAutomatic) {
        // 0) Normalize key early (prevents duplicate keys with different casing/spaces)
        const normalizedKey = data.key.trim().toLowerCase();
        data.key = normalizedKey;
        /**
         * 1) Check if the storage blueprint key already exists
         */
        const existingStorageKey = await this.GetStorageByKey(data.key);
        if (existingStorageKey) {
            if (isAutomatic)
                return null; // skip silently
            throw new errorHandler_1.ApiError(`Storage blueprint with key '${data.key}' already exists`, 400);
        }
        /**
         * 2) Validate enums
         */
        assertEnumValue(resource_1.UnitOfMeasurement, data.capacityUnit, 'Invalid capacity unit');
        assertEnumValue(storageType_enum_1.StorageType, data.type, 'Invalid storage type provided');
        if (!Array.isArray(data.allowedUnits) || data.allowedUnits.length === 0) {
            throw new errorHandler_1.ApiError('allowedUnits must be a non-empty array', 400);
        }
        data.allowedUnits.forEach((unit) => {
            assertEnumValue(resource_1.UnitOfMeasurement, unit, `Invalid allowed unit: ${unit}`);
        });
        // Capacity unit must be part of allowed units
        if (!data.allowedUnits.includes(data.capacityUnit)) {
            throw new errorHandler_1.ApiError(`Capacity unit '${data.capacityUnit}' must be included in allowed units`, 400);
        }
        /**
         * 3) Normalize strings
         */
        data.name = data.name.trim().toLowerCase();
        data.description = data.description.trim().toLowerCase();
        if (typeof data.image === 'string')
            data.image = data.image.trim();
        /**
         * 4) Numeric validation + coercion
         */
        data.minCapacity = Number(data.minCapacity);
        data.maxCapacity = Number(data.maxCapacity);
        data.connectionLimit = Number(data.connectionLimit);
        // Optional fields (can be null/undefined)
        const hasMaxInput = data.maxInputPerHour !== null && data.maxInputPerHour !== undefined;
        if (hasMaxInput)
            data.maxInputPerHour = Number(data.maxInputPerHour);
        const hasDischarge = data.dischargeRatePerHour !== null && data.dischargeRatePerHour !== undefined;
        if (hasDischarge)
            data.dischargeRatePerHour = Number(data.dischargeRatePerHour);
        data.buildCost = Number(data.buildCost);
        data.maintenanceCostPerDay = Number(data.maintenanceCostPerDay);
        data.wearThreshold = Number(data.wearThreshold);
        // Reject NaN
        const mustBeNumber = [
            ['minCapacity', data.minCapacity],
            ['maxCapacity', data.maxCapacity],
            ['connectionLimit', data.connectionLimit],
            ['buildCost', data.buildCost],
            ['maintenanceCostPerDay', data.maintenanceCostPerDay],
            ['wearThreshold', data.wearThreshold],
        ];
        for (const [field, value] of mustBeNumber) {
            if (!Number.isFinite(value)) {
                throw new errorHandler_1.ApiError(`${field} must be a valid number`, 400);
            }
        }
        if (hasMaxInput && !Number.isFinite(data.maxInputPerHour)) {
            throw new errorHandler_1.ApiError('maxInputPerHour must be a valid number', 400);
        }
        if (hasDischarge && !Number.isFinite(data.dischargeRatePerHour)) {
            throw new errorHandler_1.ApiError('dischargeRatePerHour must be a valid number', 400);
        }
        // Range checks
        if (data.minCapacity < 0) {
            throw new errorHandler_1.ApiError('Minimum capacity cannot be less than 0', 400);
        }
        if (data.maxCapacity <= data.minCapacity) {
            throw new errorHandler_1.ApiError('Maximum capacity must be greater than minimum capacity', 400);
        }
        // allow 0 if you want; if not, keep > 0
        if (!Number.isInteger(data.connectionLimit) || data.connectionLimit < 0) {
            throw new errorHandler_1.ApiError('Connection limit must be an integer >= 0', 400);
        }
        if (hasMaxInput && data.maxInputPerHour < 0) {
            throw new errorHandler_1.ApiError('maxInputPerHour cannot be negative', 400);
        }
        if (hasDischarge && data.dischargeRatePerHour < 0) {
            throw new errorHandler_1.ApiError('dischargeRatePerHour cannot be negative', 400);
        }
        if (data.buildCost < 0) {
            throw new errorHandler_1.ApiError('buildCost cannot be negative', 400);
        }
        if (data.maintenanceCostPerDay < 0) {
            throw new errorHandler_1.ApiError('maintenanceCostPerDay cannot be negative', 400);
        }
        // Condition threshold for maintenance (0..100)
        if (data.wearThreshold < 0 || data.wearThreshold > 100) {
            throw new errorHandler_1.ApiError('wearThreshold must be between 0 and 100', 400);
        }
        /**
         * 5) Save
         */
        const newStorage = new StorageBluePrint_model_1.StorageBlueprintModel(data);
        const savedStorage = await newStorage.save();
        return savedStorage.toObject();
    }
};
//# sourceMappingURL=storage.service.js.map