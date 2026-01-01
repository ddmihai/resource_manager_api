import { Types } from "mongoose";
import { ApiError } from "../../../middleware/errorHandler";
import { IStorage, IStorageBlueprint } from "../interface/storage";
import { StorageOwnership } from "../models/StorageOwnership.model";
import { StorageBlueprintService } from "./storage.service";




// Helpers
export function createKeyGuard<const K extends readonly string[]>(keys: K) {
    return (prop: string): prop is K[number] => (keys as readonly string[]).includes(prop);
}
// Helpers
export type HydratedStorageOwnership = Omit<IStorage, "bluePrintId"> & {
    _id: Types.ObjectId;
    bluePrintId: Types.ObjectId;
    blueprint: IStorageBlueprint; // embedded blueprint data
};



// Service layer for StorageOwnership
export const StorageOwnershipService = {
    async GetStorageById(id: string | Types.ObjectId): Promise<HydratedStorageOwnership> {
        if (typeof id === "string" && !Types.ObjectId.isValid(id)) {
            throw new ApiError("Invalid id", 400);
        }
        const storage = await StorageOwnership.findById(id).lean();
        if (!storage) throw new ApiError("Storage not found", 404);
        const blueprint = await StorageBlueprintService.GetStorageByKey(storage.bluePrintId.toString());
        if (!blueprint) throw new ApiError("Storage blueprint missing (data inconsistency)", 500);
        return {
            ...(storage as any),
            blueprint,
        } as HydratedStorageOwnership;
    }



    // create ownership
}