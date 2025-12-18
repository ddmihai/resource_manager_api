"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const mongoose_1 = require("mongoose");
const ressource_1 = require("../types/ressource");
const ResourceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    unitOfMeasurement: {
        type: String,
        enum: Object.values(ressource_1.IUnitOfMeasurement),
        required: true,
    },
    pricePerUnit: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.Resource = (0, mongoose_1.model)('Resource', ResourceSchema);
//# sourceMappingURL=ressource.model.js.map