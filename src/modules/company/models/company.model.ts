import mongoose from "mongoose";



const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Company name is required"],
            minlength: [5, "Company name must be at least 5 characters long"],
            maxlength: [100, "Company name must be at most 100 characters long"],
            trim: true,
            index: true,
        },

        tax: {
            type: Number,
            min: [0, "Tax cannot be negative"],
            default: 30
        },

        locationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: [true, "Location ID is required"],
            index: true,
        },

        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Owner ID is required"],
            index: true,
        },

        industryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Industry",
            required: [true, "Industry is required"],
            index: true,
        },

        description: {
            type: String,
            maxlength: [500, "Description must be at most 500 characters long"],
            trim: true,
            default: function () {
                return `${this.name} is a company operating in the industry.`;
            },
        },

        capital: {
            type: Number,
            min: [0, "Capital cannot be negative"],
            required: [true, "Capital is required"],
            default: 0,
        },

        companyShareValue: {
            type: Number,
            min: 0,
            default: 0
        },

        totalShares: {
            type: Number,
            min: [1, "Total shares must be >= 1"],
            required: true
        },

        availableShares: {
            type: Number,
            min: 0,
            required: true
        },
    },
    { timestamps: true }
);










// Optional but recommended: prevent same owner having two identical company names
companySchema.index({ ownerId: 1, name: 1 }, { unique: true });

export const Company = mongoose.model("Company", companySchema);
