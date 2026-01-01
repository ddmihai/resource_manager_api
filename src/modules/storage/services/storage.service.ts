import mongoose from "mongoose";
import { ApiError } from "../../../middleware/errorHandler";
import { UnitOfMeasurement } from "../../resource/interfaces/resource";
import { IStorageBlueprint } from "../interface/storage";
import { StorageType } from "../interface/storageType.enum";
import { StorageBlueprintModel } from "../models/StorageBluePrint.model";

export interface StorageSummary {
  message: string;
  items: unknown[];
}

export function assertEnumValue<T extends Record<string, string | number>>(enumObject: T, value: unknown, errorMessage = 'Invalid enum value'): asserts value is T[keyof T] {
  if (!Object.values(enumObject).includes(value as T[keyof T])) {
    throw new ApiError(errorMessage, 400);
  }
}




export const StorageBlueprintService = {

  // Get all storage blueprints
  async GetAllStorages(): Promise<StorageSummary> {
    const allStorages = await StorageBlueprintModel.find().lean();
    return {
      message: 'List of all storage blueprints',
      items: allStorages
    };
  },


  // get storage by unic key
  async GetStorageByKey(key: string): Promise<IStorageBlueprint | null> {
    const storage = await StorageBlueprintModel.findOne({ key }).lean();
    return (storage as IStorageBlueprint) || null;
  },


  async GetStorageById(id: string): Promise<IStorageBlueprint | null> {
    if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError('Invalid storage blueprint id', 400);
    }
    const storage = await StorageBlueprintModel.findById(id).lean();
    return (storage as IStorageBlueprint) || null;
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
  async CreateStorage(data: IStorageBlueprint, isAutomatic: boolean): Promise<IStorageBlueprint | null> {
    // 0) Normalize key early (prevents duplicate keys with different casing/spaces)
    const normalizedKey = data.key.trim().toLowerCase();
    data.key = normalizedKey;

    /**
     * 1) Check if the storage blueprint key already exists
     */
    const existingStorageKey = await this.GetStorageByKey(data.key);
    if (existingStorageKey) {
      if (isAutomatic) return null; // skip silently
      throw new ApiError(`Storage blueprint with key '${data.key}' already exists`, 400);
    }

    /**
     * 2) Validate enums
     */
    assertEnumValue(UnitOfMeasurement, data.capacityUnit, 'Invalid capacity unit');
    assertEnumValue(StorageType, data.type, 'Invalid storage type provided');

    if (!Array.isArray(data.allowedUnits) || data.allowedUnits.length === 0) {
      throw new ApiError('allowedUnits must be a non-empty array', 400);
    }

    data.allowedUnits.forEach((unit) => {
      assertEnumValue(UnitOfMeasurement, unit, `Invalid allowed unit: ${unit}`);
    });

    // Capacity unit must be part of allowed units
    if (!data.allowedUnits.includes(data.capacityUnit)) {
      throw new ApiError(
        `Capacity unit '${data.capacityUnit}' must be included in allowed units`,
        400
      );
    }

    /**
     * 3) Normalize strings
     */
    data.name = data.name.trim().toLowerCase();
    data.description = data.description.trim().toLowerCase();
    if (typeof data.image === 'string') data.image = data.image.trim();

    /**
     * 4) Numeric validation + coercion
     */
    data.minCapacity = Number(data.minCapacity);
    data.maxCapacity = Number(data.maxCapacity);
    data.connectionLimit = Number(data.connectionLimit);

    // Optional fields (can be null/undefined)
    const hasMaxInput = data.maxInputPerHour !== null && data.maxInputPerHour !== undefined;
    if (hasMaxInput) data.maxInputPerHour = Number(data.maxInputPerHour);

    const hasDischarge = data.dischargeRatePerHour !== null && data.dischargeRatePerHour !== undefined;
    if (hasDischarge) data.dischargeRatePerHour = Number(data.dischargeRatePerHour);

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
    ] as const;

    for (const [field, value] of mustBeNumber) {
      if (!Number.isFinite(value)) {
        throw new ApiError(`${field} must be a valid number`, 400);
      }
    }

    if (hasMaxInput && !Number.isFinite(data.maxInputPerHour as number)) {
      throw new ApiError('maxInputPerHour must be a valid number', 400);
    }
    if (hasDischarge && !Number.isFinite(data.dischargeRatePerHour as number)) {
      throw new ApiError('dischargeRatePerHour must be a valid number', 400);
    }

    // Range checks
    if (data.minCapacity < 0) {
      throw new ApiError('Minimum capacity cannot be less than 0', 400);
    }
    if (data.maxCapacity <= data.minCapacity) {
      throw new ApiError('Maximum capacity must be greater than minimum capacity', 400);
    }

    // allow 0 if you want; if not, keep > 0
    if (!Number.isInteger(data.connectionLimit) || data.connectionLimit < 0) {
      throw new ApiError('Connection limit must be an integer >= 0', 400);
    }

    if (hasMaxInput && (data.maxInputPerHour as number) < 0) {
      throw new ApiError('maxInputPerHour cannot be negative', 400);
    }

    if (hasDischarge && (data.dischargeRatePerHour as number) < 0) {
      throw new ApiError('dischargeRatePerHour cannot be negative', 400);
    }

    if (data.buildCost < 0) {
      throw new ApiError('buildCost cannot be negative', 400);
    }

    if (data.maintenanceCostPerDay < 0) {
      throw new ApiError('maintenanceCostPerDay cannot be negative', 400);
    }

    // Condition threshold for maintenance (0..100)
    if (data.wearThreshold < 0 || data.wearThreshold > 100) {
      throw new ApiError('wearThreshold must be between 0 and 100', 400);
    }

    /**
     * 5) Save
     */
    const newStorage = new StorageBlueprintModel(data);
    const savedStorage = await newStorage.save();

    return savedStorage.toObject() as IStorageBlueprint;
  }


};
