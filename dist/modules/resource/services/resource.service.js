"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resource_1 = require("../interfaces/resource");
const resource_model_1 = require("../models/resource.model");
const errorHandler_1 = require("../../../middleware/errorHandler");
function isUnitOfMeasurement(value) {
    return typeof value === 'string' && Object.values(resource_1.UnitOfMeasurement).includes(value);
}
// SERVICE create Resource
exports.ResourceService = {
    async EditResource(id, data) {
        if (!mongoose_1.default.isObjectIdOrHexString(id)) {
            throw new errorHandler_1.ApiError('Invalid resource id', 400);
        }
        const exists = await resource_model_1.Resource.exists({ _id: id });
        console.log('exists?', exists);
        // ✅ allow only editable fields (prevents accidental updates)
        const update = {};
        if (data.name !== undefined)
            update.name = data.name.trim().toLowerCase();
        if (data.description !== undefined)
            update.description = data.description.trim();
        if (data.image !== undefined)
            update.image = data.image ?? undefined;
        if (data.isRaw !== undefined)
            update.isRaw = data.isRaw;
        // Decide your rule:
        // - if you want admins to change base price, allow it
        // - otherwise block it
        if (data.basePricePerUnit !== undefined)
            update.basePricePerUnit = Number(data.basePricePerUnit);
        if (data.pricePerUnit !== undefined)
            update.pricePerUnit = Number(data.pricePerUnit);
        if (data.unitOfMeasurement !== undefined)
            update.unitOfMeasurement = data.unitOfMeasurement;
        // prevent these
        delete update.createdAt;
        delete update.updatedAt;
        delete update.id;
        console.log(id);
        const resource = await resource_model_1.Resource.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true, // ✅ IMPORTANT
        }).lean();
        if (!resource) {
            throw new errorHandler_1.ApiError('Resource not found', 404);
        }
        return resource;
    },
    async GetResourceById(id) {
        const resource = await resource_model_1.Resource.findById(id).lean();
        return resource;
    },
    async GetAllResources() {
        const resources = await resource_model_1.Resource.find().lean();
        return resources;
    },
    // Check if the name of the resource exists
    async ResourceNameExists(name) {
        if (!name?.trim()) {
            throw new Error('Invalid resource name provided');
        }
        const normalizedName = name.trim().toLowerCase();
        return !!(await resource_model_1.Resource.exists({ name: normalizedName }));
    },
    // create resource
    async CreateResource(data, isAutomatic) {
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
            if (isAutomatic)
                return null; // or return { skipped: true }
            throw new Error('Resource already exists');
        }
        // ✅ create + save
        const created = await resource_model_1.Resource.create({
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
//# sourceMappingURL=resource.service.js.map