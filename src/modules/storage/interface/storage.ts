import { Types } from "mongoose";
import { UnitOfMeasurement } from "../../resource/interfaces/resource";
import { StorageType } from "./storageType.enum";


/** Global catalogue entry (same for everyone) */
export interface IStorageBlueprint {
    key: string;                     // unique key e.g. "warehouse_basic"
    type: StorageType;
    name: string;
    description: string;
    image?: string;                 // optional image URL/icon

    // Capacity rules (global)
    capacityUnit: UnitOfMeasurement; // the unit this storage capacity is measured in
    minCapacity: number;             // min buildable capacity (in capacityUnit)
    maxCapacity: number;             // max buildable capacity (in capacityUnit)

    // Compatibility (global)
    allowedUnits: UnitOfMeasurement[]; // resource.unitOfMeasurement must be included

    // Connections/performance (global)
    connectionLimit: number;         // max number of linked producers/consumers
    maxInputPerHour?: number;           // optional throughput limit
    dischargeRatePerHour?: number;   // optional (batteries), 0.02 = 2% per hour

    // Economy/maintenance (global)
    buildCost: number;               // one-time cost to build
    maintenanceCostPerDay: number;   // recurring cost
    wearThreshold: number;           // condition <= threshold => needs maintenance warning (e.g. 10)
}


/** User/company-owned storage instance (Mongo document) */
export interface IStorage {
    _id?: string;

    // Ownership + world placement
    companyId: Types.ObjectId;      // owner (company/user)
    locationId: Types.ObjectId;     // where it is located
    bluePrintId: Types.ObjectId;   // references the id of the storage blueprint


    capacity: number;       // chosen at build time (in blueprint.capacityUnit)
    storedAmount: number;   // current stored amount (same unit system you decide)

    // Optional links (instances)
    connectedProducers: Types.ObjectId[]; // producer ids (strings for now)

    // Maintenance state (instance)
    condition: number;      // 0..100
    lastMaintenanceAt?: Date;

    createdAt?: Date;
    updatedAt?: Date;
}

