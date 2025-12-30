"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageBlueprintModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const storageType_enum_1 = require("../interface/storageType.enum");
const resource_1 = require("../../resource/interfaces/resource");
// This is the schema for the blueprint of a storage unit
const storageSchemaBluePrint = new mongoose_1.default.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: Object.values(storageType_enum_1.StorageType),
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    // Capacity rules (global)
    capacityUnit: {
        type: String,
        required: true,
        enum: Object.values(resource_1.UnitOfMeasurement)
    },
    minCapacity: {
        type: Number,
        required: true
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    // Compatibility (global)
    allowedUnits: {
        type: [String],
        required: true,
        enum: Object.values(resource_1.UnitOfMeasurement)
    },
    // Connections/performance (global)
    connectionLimit: {
        type: Number,
        required: true
    },
    maxInputPerHour: {
        type: Number,
        default: null
    },
    dischargeRatePerHour: {
        type: Number,
        default: null
    },
    // Economy/maintenance (global)
    buildCost: { type: Number, required: true },
    maintenanceCostPerDay: { type: Number, required: true },
    wearThreshold: { type: Number, required: true },
});
exports.StorageBlueprintModel = mongoose_1.default.model('StorageBlueprint', storageSchemaBluePrint);
//# sourceMappingURL=StorageBluePrint.model.js.map