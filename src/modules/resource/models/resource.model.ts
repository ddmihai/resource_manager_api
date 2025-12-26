import { Schema, model } from 'mongoose';
import { UnitOfMeasurement } from '../interfaces/resource';



const ResourceSchema = new Schema(
    {
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
            enum: Object.values(UnitOfMeasurement),
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
    },
    { timestamps: true }
);


export const Resource = model('Resource', ResourceSchema);
