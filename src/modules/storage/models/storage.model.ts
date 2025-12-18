import { Schema, model } from 'mongoose';
import { IUnitOfMeasurement } from '../types/ressource';



const ResourceSchema = new Schema(
    {
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
            enum: Object.values(IUnitOfMeasurement),
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
    },
    {
        timestamps: true,
    }
);

export const Resource = model('Resource', ResourceSchema);
