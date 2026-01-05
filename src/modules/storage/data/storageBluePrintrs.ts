// storageBlueprints.seed.ts

import { UnitOfMeasurement } from "../../resource/interfaces/resource";
import { StorageType } from "../interface/storageType.enum";
import { IStorageBlueprint } from "../interface/storage";

export const STORAGE_BLUEPRINTS_SEED: IStorageBlueprint[] = [
    // ──────────────────────────────
    // WAREHOUSES (SOLIDS)
    // ──────────────────────────────
    {
        key: "warehouse_basic",
        type: StorageType.WAREHOUSE,
        name: "Basic Warehouse",
        description: "General-purpose solid storage for iron, coal, wood, and stone.",
        capacityUnit: UnitOfMeasurement.TON,
        minCapacity: 500,
        maxCapacity: 5000,
        allowedUnits: [UnitOfMeasurement.TON, UnitOfMeasurement.KG, UnitOfMeasurement.UNIT],
        connectionLimit: 3,
        maxInputPerHour: 18000,
        dischargeRatePerHour: 30000,
        buildCost: 12000,
        maintenanceCostPerDay: 20,
        wearThreshold: 10,
    },
    {
        key: "warehouse_large",
        type: StorageType.WAREHOUSE,
        name: "Large Warehouse",
        description: "High-capacity solid storage with increased maintenance costs.",
        capacityUnit: UnitOfMeasurement.TON,
        minCapacity: 3000,
        maxCapacity: 20000,
        allowedUnits: [UnitOfMeasurement.TON, UnitOfMeasurement.KG, UnitOfMeasurement.UNIT],
        connectionLimit: 6,
        maxInputPerHour: 72000,
        dischargeRatePerHour: 120000,
        buildCost: 65000,
        maintenanceCostPerDay: 65,
        wearThreshold: 10,
    },

    // ──────────────────────────────
    // SILOS (GRANULAR SOLIDS)
    // ──────────────────────────────
    {
        key: "silo_basic",
        type: StorageType.SILO,
        name: "Basic Silo",
        description: "Efficient storage for granular materials like coal or grain.",
        capacityUnit: UnitOfMeasurement.TON,
        minCapacity: 300,
        maxCapacity: 3000,
        allowedUnits: [UnitOfMeasurement.TON, UnitOfMeasurement.KG],
        connectionLimit: 2,
        maxInputPerHour: 10800,
        dischargeRatePerHour: 18000,
        buildCost: 9000,
        maintenanceCostPerDay: 15,
        wearThreshold: 10,
    },
    {
        key: "silo_industrial",
        type: StorageType.SILO,
        name: "Industrial Silo",
        description: "Large-scale silo for bulk granular materials.",
        capacityUnit: UnitOfMeasurement.TON,
        minCapacity: 2000,
        maxCapacity: 15000,
        allowedUnits: [UnitOfMeasurement.TON, UnitOfMeasurement.KG],
        connectionLimit: 4,
        maxInputPerHour: 54000,
        dischargeRatePerHour: 90000,
        buildCost: 40000,
        maintenanceCostPerDay: 45,
        wearThreshold: 10,
    },

    // ──────────────────────────────
    // TANKS (LIQUIDS)
    // ──────────────────────────────
    {
        key: "tank_small",
        type: StorageType.TANK,
        name: "Small Tank",
        description: "Compact liquid storage for crude oil, petrol, and diesel.",
        capacityUnit: UnitOfMeasurement.LITER,
        minCapacity: 2000,
        maxCapacity: 15000,
        allowedUnits: [UnitOfMeasurement.LITER],
        connectionLimit: 2,
        maxInputPerHour: 54000,
        dischargeRatePerHour: 90000,
        buildCost: 18000,
        maintenanceCostPerDay: 30,
        wearThreshold: 10,
    },
    {
        key: "tank_large",
        type: StorageType.TANK,
        name: "Large Tank",
        description: "Industrial-scale liquid storage with higher upkeep.",
        capacityUnit: UnitOfMeasurement.LITER,
        minCapacity: 20000,
        maxCapacity: 120000,
        allowedUnits: [UnitOfMeasurement.LITER],
        connectionLimit: 4,
        maxInputPerHour: 432000,
        dischargeRatePerHour: 720000,
        buildCost: 90000,
        maintenanceCostPerDay: 90,
        wearThreshold: 10,
    },

    // ──────────────────────────────
    // BATTERIES (ELECTRICITY)
    // ──────────────────────────────
    {
        key: "battery_small",
        type: StorageType.BATTERY,
        name: "Small Battery",
        description: "Small electrical battery with moderate discharge rate.",
        capacityUnit: UnitOfMeasurement.KWH,
        minCapacity: 200,
        maxCapacity: 1000,
        allowedUnits: [UnitOfMeasurement.KWH],
        connectionLimit: 2,
        maxInputPerHour: 3600,
        dischargeRatePerHour: 0.03, // keep as your battery self-discharge value
        buildCost: 20000,
        maintenanceCostPerDay: 15,
        wearThreshold: 10,
    },
    {
        key: "battery_grid",
        type: StorageType.BATTERY,
        name: "Battery Grid",
        description: "Large battery grid with improved efficiency.",
        capacityUnit: UnitOfMeasurement.KWH,
        minCapacity: 2000,
        maxCapacity: 20000,
        allowedUnits: [UnitOfMeasurement.KWH],
        connectionLimit: 6,
        maxInputPerHour: 72000,
        dischargeRatePerHour: 0.012, // keep as your battery self-discharge value
        buildCost: 180000,
        maintenanceCostPerDay: 80,
        wearThreshold: 10,
    },

    // ──────────────────────────────
    // CHEMICAL / GAS
    // ──────────────────────────────
    {
        key: "chemical_hydrogen_basic",
        type: StorageType.CHEMICAL,
        name: "Hydrogen Container",
        description: "Pressurized container for hydrogen and industrial gases.",
        capacityUnit: UnitOfMeasurement.KG,
        minCapacity: 200,
        maxCapacity: 5000,
        allowedUnits: [UnitOfMeasurement.KG],
        connectionLimit: 2,
        maxInputPerHour: 18000,
        dischargeRatePerHour: 30000,
        buildCost: 45000,
        maintenanceCostPerDay: 35,
        wearThreshold: 10,
    },
    {
        key: "chemical_hydrogen_industrial",
        type: StorageType.CHEMICAL,
        name: "Industrial Hydrogen Tank",
        description: "Large-scale pressurized hydrogen storage.",
        capacityUnit: UnitOfMeasurement.KG,
        minCapacity: 3000,
        maxCapacity: 30000,
        allowedUnits: [UnitOfMeasurement.KG],
        connectionLimit: 4,
        maxInputPerHour: 108000,
        dischargeRatePerHour: 180000,
        buildCost: 220000,
        maintenanceCostPerDay: 120,
        wearThreshold: 10,
    },
];
