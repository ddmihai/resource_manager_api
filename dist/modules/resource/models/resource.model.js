"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const mongoose_1 = require("mongoose");
const resource_1 = require("../interfaces/resource");
const ResourceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    unitOfMeasurement: {
        type: String,
        enum: Object.values(resource_1.UnitOfMeasurement),
        required: true,
    },
    basePricePerUnit: {
        type: Number,
        required: true,
        min: 0,
    },
    pricePerUnit: {
        type: Number,
        required: true,
        min: 0,
    },
    isRaw: {
        type: Boolean,
        required: true,
        default: true,
    },
    image: { type: String, default: undefined },
    lastPriceUpdateAt: Date,
}, { timestamps: true });
exports.Resource = (0, mongoose_1.model)('Resource', ResourceSchema);
//# sourceMappingURL=resource.model.js.map