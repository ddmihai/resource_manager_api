"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResourceSchema = void 0;
const zod_1 = require("zod");
const ressource_1 = require("../types/ressource");
exports.CreateResourceSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
        description: zod_1.z.string().min(20),
        unitOfMeasurement: zod_1.z.nativeEnum(ressource_1.IUnitOfMeasurement),
        pricePerUnit: zod_1.z.number().positive(),
        image: zod_1.z.string().url().optional(),
    }),
});
//# sourceMappingURL=resource.schema.js.map