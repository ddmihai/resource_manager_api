import mongoose from "mongoose";
import { ApiError } from "../../../middleware/errorHandler";
import { Resource } from "../models/ressource.model";
import { IResource } from "../types/ressource";



export const ResourceService = {


    // get all resources
    async GetAllResources() {
        return await Resource.find();
    },


    // get resource detials by id
    async GetResourceById(id: string) {
        if (!mongoose.isObjectIdOrHexString(id)) {
            throw new ApiError('Invalid resource id', 400);
        };
        const resource = await Resource.findById(id).lean();
        if (!resource) {
            throw new ApiError('Resource not found!', 404);
        };
        return resource;
    },



    // check if a resource exists
    async ResourceExists(name: string): Promise<boolean> {
        const resource = await Resource.exists({ name });
        return !!resource;
    },

    // create a resource
    async createResource(data: IResource) {
        const normalizedName = data.name.trim().toLowerCase();

        // Fast existence check (returns null or {_id: ...})
        const exists = await Resource.exists({ name: normalizedName });
        if (exists) throw new ApiError('Resource already exists', 409);

        const pricePerUnit = Number(data.pricePerUnit);
        if (!Number.isFinite(pricePerUnit) || pricePerUnit <= 0) {
            throw new ApiError('pricePerUnit must be a positive number', 400);
        }

        try {
            const created = await Resource.create({
                name: normalizedName,
                description: data.description, // include only if your model has it
                unitOfMeasurement: data.unitOfMeasurement,
                pricePerUnit,
                image: data.image,
            });

            return {
                status: true,
                message: 'Resource created',
                data: created,
            };
        } catch (err: any) {
            // If you have unique: true on name, Mongo can still race-condition here.
            if (err?.code === 11000) {
                throw new ApiError('Resource already exists', 409);
            }
            throw err;
        }
    },
};
