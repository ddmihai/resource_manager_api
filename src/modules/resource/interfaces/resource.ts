export enum UnitOfMeasurement {
    KWH = 'kwh',
    LITER = 'liter',
    CUBIC_METER = 'cubic_meter',
    KG = 'kg',
    TON = 'ton',
    UNIT = 'unit',
}



export interface IResource {
    id?: string;
    name: string;
    description: string;

    basePricePerUnit: number;
    pricePerUnit: number;
    unitOfMeasurement: UnitOfMeasurement;

    image?: string | null;   // ✅ allow null
    isRaw: boolean;

    lastPriceUpdateAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
