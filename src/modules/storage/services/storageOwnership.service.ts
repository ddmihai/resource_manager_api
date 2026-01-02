import { Types } from "mongoose";
import { ApiError } from "../../../middleware/errorHandler";
import { IStorage, IStorageBlueprint } from "../interface/storage";
import { StorageOwnership } from "../models/StorageOwnership.model";
import { StorageBlueprintService } from "./storage.service";
import { CompanyServices } from "../../company/services/Company.services";



interface CreateOwnershipDTO {
    companyId: Types.ObjectId;
    locationId: Types.ObjectId;
    bluePrintId: Types.ObjectId;
    ownerId: Types.ObjectId;
}



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
    },



    // create ownership
    async CreateOwnership({ ownerId, companyId, locationId, bluePrintId }: CreateOwnershipDTO) {
        /**
         *    Validate blueprint existence
         */
        if (!Types.ObjectId.isValid(bluePrintId)) {
            throw new ApiError("Invalid blueprint id", 400);
        };
        const blueprint = await StorageBlueprintService.GetStorageById(bluePrintId.toString());
        if (!blueprint) {
            throw new ApiError("Storage blueprint not found", 404);
        };
        /**
         *    Validate location and company id
         */
        if (!Types.ObjectId.isValid(companyId)) {
            throw new ApiError("Invalid company id", 400);
        };
        if (!Types.ObjectId.isValid(locationId)) {
            throw new ApiError("Invalid location id", 400);
        };
        /**
         *      Check if the company is real 
         */
        const existingComapny = await CompanyServices.GetAllUserCompanies(ownerId.toString());
        const companyIds = existingComapny.map((c: any) => c._id.toString());
        if (!companyIds.includes(companyId.toString())) {
            throw new ApiError("Company not found or you don't have access to it", 403);
        }


        const newOwnership = new StorageOwnership({
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
}