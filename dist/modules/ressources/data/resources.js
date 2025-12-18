"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESOURCES = void 0;
const ressource_1 = require("../types/ressource");
exports.RESOURCES = [
    {
        name: 'iron',
        description: 'Raw iron ore',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.TON,
        pricePerUnit: 90,
    },
    {
        name: 'silver',
        description: 'Precious metal',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.KG,
        pricePerUnit: 700,
    },
    {
        name: 'gold',
        description: 'High-value precious metal',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.KG,
        pricePerUnit: 55000,
    },
    {
        name: 'platinum',
        description: 'Rare precious metal',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.KG,
        pricePerUnit: 30000,
    },
    {
        name: 'wood',
        description: 'Processed timber',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.CUBIC_METER,
        pricePerUnit: 120,
    },
    {
        name: 'oil',
        description: 'Crude oil',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.LITER,
        pricePerUnit: 0.45,
    },
    {
        name: 'electricity',
        description: 'Electrical energy',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.KWH,
        pricePerUnit: 0.25,
    },
    {
        name: 'hydrogen',
        description: 'Clean energy fuel',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.KG,
        pricePerUnit: 6,
    },
    {
        name: 'petrol',
        description: 'Refined vehicle fuel',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.LITER,
        pricePerUnit: 1.5,
    },
    {
        name: 'coal',
        description: 'Thermal coal',
        unitOfMeasurement: ressource_1.IUnitOfMeasurement.TON,
        pricePerUnit: 100,
    },
];
//# sourceMappingURL=resources.js.map