import type { Types } from 'mongoose';

export enum StorageType {
    WAREHOUSE = 'warehouse',
    SILO = 'silo',
    TANK = 'tank',
    BATTERY = 'battery',
}

export interface IStorage {
    id?: string;
    name: string;
    type: StorageType;
    resourceStored: string | Types.ObjectId; // Resource id
    capacity: number;                       // max
    storedAmount?: number;                  // current (default 0)
    isProcessed: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}
