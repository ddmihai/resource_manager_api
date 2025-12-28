import mongoose from 'mongoose';
import { getResourceById } from '../controllers/getResourceById';
import { IResource, UnitOfMeasurement } from '../interfaces/resource';
import { Resource } from '../models/resource.model';
import { ApiError } from '../../../middleware/errorHandler';


function isUnitOfMeasurement(value: unknown): value is UnitOfMeasurement {
    return typeof value === 'string' && (Object.values(UnitOfMeasurement) as string[]).includes(value);
}








// SERVICE create Resource
export const ResourceService = {

    async EditResource(id: string, data: Partial<IResource>): Promise<IResource> {
        if (!mongoose.isObjectIdOrHexString(id)) {
            throw new ApiError('Invalid resource id', 400);
        }

        const exists = await Resource.exists({ _id: id });
        console.log('exists?', exists);


        // ✅ allow only editable fields (prevents accidental updates)
        const update: Partial<IResource> = {};
        if (data.name !== undefined) update.name = data.name.trim().toLowerCase();
        if (data.description !== undefined) update.description = data.description.trim();
        if (data.image !== undefined) update.image = data.image ?? undefined;
        if (data.isRaw !== undefined) update.isRaw = data.isRaw;

        // Decide your rule:
        // - if you want admins to change base price, allow it
        // - otherwise block it
        if (data.basePricePerUnit !== undefined) update.basePricePerUnit = Number(data.basePricePerUnit);
        if (data.pricePerUnit !== undefined) update.pricePerUnit = Number(data.pricePerUnit);
        if (data.unitOfMeasurement !== undefined) update.unitOfMeasurement = data.unitOfMeasurement;

        // prevent these
        delete (update as any).createdAt;
        delete (update as any).updatedAt;
        delete (update as any).id;

        console.log(id)
        const resource = await Resource.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true, // ✅ IMPORTANT
        }).lean<IResource | null>();


        if (!resource) {
            throw new ApiError('Resource not found', 404);
        }

        return resource;
    },


    async GetResourceById(id: string): Promise<IResource | null> {
        const resource = await Resource.findById(id).lean<IResource | null>();
        return resource;
    },


    async GetAllResources(): Promise<IResource[]> {
        const resources = await Resource.find().lean<IResource[]>();
        return resources;
    },





    // Check if the name of the resource exists
    async ResourceNameExists(name: string): Promise<boolean> {
        if (!name?.trim()) {
            throw new Error('Invalid resource name provided');
        }
        const normalizedName = name.trim().toLowerCase();
        return !!(await Resource.exists({ name: normalizedName }));
    },





    // create resource
    async CreateResource(data: IResource, isAutomatic: boolean) {
        const normalizedName = data.name.trim().toLowerCase();

        // ✅ validate unitOfMeasurement (call the guard with the value)
        if (!isUnitOfMeasurement(data.unitOfMeasurement)) {
            throw new Error('Invalid unit of measurement');
        }

        const exists = await this.ResourceNameExists(normalizedName);

        // ✅ if exists:
        // - automatic seed: skip
        // - manual create: throw
        if (exists) {
            if (isAutomatic) return null; // or return { skipped: true }
            throw new Error('Resource already exists');
        }

        // ✅ create + save
        const created = await Resource.create({
            name: normalizedName,
            description: data.description,
            isRaw: data.isRaw,
            basePricePerUnit: Number(data.pricePerUnit),
            pricePerUnit: Number(data.pricePerUnit),
            unitOfMeasurement: data.unitOfMeasurement, // ✅ keep lowercase enum value
            image: data.image,
        });

        return created;
    }

};
