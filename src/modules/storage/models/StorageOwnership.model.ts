import mongoose from 'mongoose';




const storageOwnershipSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    bluePrintId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'StorageBlueprint'
    },
    capacity: {
        type: Number,
        required: true,
        min: 0
    },
    storedAmount: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    connectedProducers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        required: false
    },
    condition: {
        type: Number,
        required: false,
        default: 100,
        min: 0,
        max: 100,
    },
    lastMaintenanceAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});



export const StorageOwnership = mongoose.model('StorageOwnership', storageOwnershipSchema);