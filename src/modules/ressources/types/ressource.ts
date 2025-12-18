export enum IUnitOfMeasurement {
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
    unitOfMeasurement: IUnitOfMeasurement;
    pricePerUnit: number;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
