import mongoose from "mongoose";
import { StorageType } from "../interface/storageType.enum";
import { UnitOfMeasurement } from "../../resource/interfaces/resource";


// This is the schema for the blueprint of a storage unit
const storageSchemaBluePrint = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: Object.values(StorageType),
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
        enum: Object.values(UnitOfMeasurement)
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
    allowedUnits: {             // allowed units of measurement
        type: [String],
        required: true,
        enum: Object.values(UnitOfMeasurement)
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





export const StorageBlueprintModel = mongoose.model('StorageBlueprint', storageSchemaBluePrint);