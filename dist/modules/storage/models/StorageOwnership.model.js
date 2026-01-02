"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageOwnership = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const storageOwnershipSchema = new mongoose_1.default.Schema({
    companyId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    locationId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    bluePrintId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: [mongoose_1.default.Schema.Types.ObjectId],
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
exports.StorageOwnership = mongoose_1.default.model('StorageOwnership', storageOwnershipSchema);
//# sourceMappingURL=StorageOwnership.model.js.map