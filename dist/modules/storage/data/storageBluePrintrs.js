"use strict";
// storageBlueprints.seed.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_BLUEPRINTS_SEED = void 0;
const resource_1 = require("../../resource/interfaces/resource");
const storageType_enum_1 = require("../interface/storageType.enum");
exports.STORAGE_BLUEPRINTS_SEED = [
    // ──────────────────────────────
    // WAREHOUSES (SOLIDS)
    // ──────────────────────────────
    {
        key: "warehouse_basic",
        type: storageType_enum_1.StorageType.WAREHOUSE,
        name: "Basic Warehouse",
        description: "General-purpose solid storage for iron, coal, wood, and stone.",
        capacityUnit: resource_1.UnitOfMeasurement.TON,
        minCapacity: 500,
        maxCapacity: 5000,
        allowedUnits: [
            resource_1.UnitOfMeasurement.TON,
            resource_1.UnitOfMeasurement.KG,
            resource_1.UnitOfMeasurement.UNIT,
        ],
        connectionLimit: 3,
        buildCost: 12000,
        maintenanceCostPerDay: 20,
        wearThreshold: 10,
    },
    {
        key: "warehouse_large",
        type: storageType_enum_1.StorageType.WAREHOUSE,
        name: "Large Warehouse",
        description: "High-capacity solid storage with increased maintenance costs.",
        capacityUnit: resource_1.UnitOfMeasurement.TON,
        minCapacity: 3000,
        maxCapacity: 20000,
        allowedUnits: [
            resource_1.UnitOfMeasurement.TON,
            resource_1.UnitOfMeasurement.KG,
            resource_1.UnitOfMeasurement.UNIT,
        ],
        connectionLimit: 6,
        buildCost: 65000,
        maintenanceCostPerDay: 65,
        wearThreshold: 10,
    },
    // ──────────────────────────────
    // SILOS (GRANULAR SOLIDS)
    // ──────────────────────────────
    {
        key: "silo_basic",
        type: storageType_enum_1.StorageType.SILO,
        name: "Basic Silo",
        description: "Efficient storage for granular materials like coal or grain.",
        capacityUnit: resource_1.UnitOfMeasurement.TON,
        minCapacity: 300,
        maxCapacity: 3000,
        allowedUnits: [resource_1.UnitOfMeasurement.TON, resource_1.UnitOfMeasurement.KG],
        connectionLimit: 2,
        buildCost: 9000,
        maintenanceCostPerDay: 15,
        wearThreshold: 10,
    },
    {
        key: "silo_industrial",
        type: storageType_enum_1.StorageType.SILO,
        name: "Industrial Silo",
        description: "Large-scale silo for bulk granular materials.",
        capacityUnit: resource_1.UnitOfMeasurement.TON,
        minCapacity: 2000,
        maxCapacity: 15000,
        allowedUnits: [resource_1.UnitOfMeasurement.TON, resource_1.UnitOfMeasurement.KG],
        connectionLimit: 4,
        buildCost: 40000,
        maintenanceCostPerDay: 45,
        wearThreshold: 10,
    },
    // ──────────────────────────────
    // TANKS (LIQUIDS)
    // ──────────────────────────────
    {
        key: "tank_small",
        type: storageType_enum_1.StorageType.TANK,
        name: "Small Tank",
        description: "Compact liquid storage for crude oil, petrol, and diesel.",
        capacityUnit: resource_1.UnitOfMeasurement.LITER,
        minCapacity: 2000,
        maxCapacity: 15000,
        allowedUnits: [resource_1.UnitOfMeasurement.LITER],
        connectionLimit: 2,
        buildCost: 18000,
        maintenanceCostPerDay: 30,
        wearThreshold: 10,
    },
    {
        key: "tank_large",
        type: storageType_enum_1.StorageType.TANK,
        name: "Large Tank",
        description: "Industrial-scale liquid storage with higher upkeep.",
        capacityUnit: resource_1.UnitOfMeasurement.LITER,
        minCapacity: 20000,
        maxCapacity: 120000,
        allowedUnits: [resource_1.UnitOfMeasurement.LITER],
        connectionLimit: 4,
        buildCost: 90000,
        maintenanceCostPerDay: 90,
        wearThreshold: 10,
    },
    // ──────────────────────────────
    // BATTERIES (ELECTRICITY)
    // ──────────────────────────────
    {
        key: "battery_small",
        type: storageType_enum_1.StorageType.BATTERY,
        name: "Small Battery",
        description: "Small electrical battery with moderate discharge rate.",
        capacityUnit: resource_1.UnitOfMeasurement.KWH,
        minCapacity: 200,
        maxCapacity: 1000,
        allowedUnits: [resource_1.UnitOfMeasurement.KWH],
        connectionLimit: 2,
        dischargeRatePerHour: 0.03,
        buildCost: 20000,
        maintenanceCostPerDay: 15,
        wearThreshold: 10,
    },
    {
        key: "battery_grid",
        type: storageType_enum_1.StorageType.BATTERY,
        name: "Battery Grid",
        description: "Large battery grid with improved efficiency.",
        capacityUnit: resource_1.UnitOfMeasurement.KWH,
        minCapacity: 2000,
        maxCapacity: 20000,
        allowedUnits: [resource_1.UnitOfMeasurement.KWH],
        connectionLimit: 6,
        dischargeRatePerHour: 0.012,
        buildCost: 180000,
        maintenanceCostPerDay: 80,
        wearThreshold: 10,
    },
    // ──────────────────────────────
    // CHEMICAL / GAS
    // ──────────────────────────────
    {
        key: "chemical_hydrogen_basic",
        type: storageType_enum_1.StorageType.CHEMICAL,
        name: "Hydrogen Container",
        description: "Pressurized container for hydrogen and industrial gases.",
        capacityUnit: resource_1.UnitOfMeasurement.KG,
        minCapacity: 200,
        maxCapacity: 5000,
        allowedUnits: [resource_1.UnitOfMeasurement.KG],
        connectionLimit: 2,
        buildCost: 45000,
        maintenanceCostPerDay: 35,
        wearThreshold: 10,
    },
    {
        key: "chemical_hydrogen_industrial",
        type: storageType_enum_1.StorageType.CHEMICAL,
        name: "Industrial Hydrogen Tank",
        description: "Large-scale pressurized hydrogen storage.",
        capacityUnit: resource_1.UnitOfMeasurement.KG,
        minCapacity: 3000,
        maxCapacity: 30000,
        allowedUnits: [resource_1.UnitOfMeasurement.KG],
        connectionLimit: 4,
        buildCost: 220000,
        maintenanceCostPerDay: 120,
        wearThreshold: 10,
    },
];
//# sourceMappingURL=storageBluePrintrs.js.map