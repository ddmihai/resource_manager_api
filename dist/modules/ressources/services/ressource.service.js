"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_1 = require("../../../middleware/errorHandler");
const ressource_model_1 = require("../models/ressource.model");
exports.ResourceService = {
    // get all resources
    async GetAllResources() {
        return await ressource_model_1.Resource.find();
    },
    // get resource detials by id
    async GetResourceById(id) {
        if (!mongoose_1.default.isObjectIdOrHexString(id)) {
            throw new errorHandler_1.ApiError('Invalid resource id', 400);
        }
        ;
        const resource = await ressource_model_1.Resource.findById(id).lean();
        if (!resource) {
            throw new errorHandler_1.ApiError('Resource not found!', 404);
        }
        ;
        return resource;
    },
    // check if a resource exists
    async ResourceExists(name) {
        const resource = await ressource_model_1.Resource.exists({ name });
        return !!resource;
    },
    // create a resource
    async createResource(data) {
        const normalizedName = data.name.trim().toLowerCase();
        // Fast existence check (returns null or {_id: ...})
        const exists = await ressource_model_1.Resource.exists({ name: normalizedName });
        if (exists)
            throw new errorHandler_1.ApiError('Resource already exists', 409);
        const pricePerUnit = Number(data.pricePerUnit);
        if (!Number.isFinite(pricePerUnit) || pricePerUnit <= 0) {
            throw new errorHandler_1.ApiError('pricePerUnit must be a positive number', 400);
        }
        try {
            const created = await ressource_model_1.Resource.create({
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
        }
        catch (err) {
            // If you have unique: true on name, Mongo can still race-condition here.
            if (err?.code === 11000) {
                throw new errorHandler_1.ApiError('Resource already exists', 409);
            }
            throw err;
        }
    },
};
//# sourceMappingURL=ressource.service.js.map