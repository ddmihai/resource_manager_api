import { IResource, UnitOfMeasurement } from '../interfaces/resource';




export const RESOURCES: IResource[] = [
    {
        name: 'iron',
        description: 'Raw iron ore used for steel production.',
        basePricePerUnit: 90,
        pricePerUnit: 90,
        unitOfMeasurement: UnitOfMeasurement.TON,
        isRaw: true,
    },
    {
        name: 'coal',
        description: 'Fossil fuel used for energy and steel manufacturing.',
        basePricePerUnit: 100,
        pricePerUnit: 100,
        unitOfMeasurement: UnitOfMeasurement.TON,
        isRaw: true,
    },
    {
        name: 'wood',
        description: 'Timber harvested from forests.',
        basePricePerUnit: 120,
        pricePerUnit: 120,
        unitOfMeasurement: UnitOfMeasurement.CUBIC_METER,
        isRaw: true,
    },
    {
        name: 'oil',
        description: 'Crude oil extracted from underground reservoirs.',
        basePricePerUnit: 0.45,
        pricePerUnit: 0.45,
        unitOfMeasurement: UnitOfMeasurement.LITER,
        isRaw: true,
    },
    {
        name: 'natural gas',
        description: 'Gaseous fossil fuel used for heating and electricity.',
        basePricePerUnit: 0.3,
        pricePerUnit: 0.3,
        unitOfMeasurement: UnitOfMeasurement.CUBIC_METER,
        isRaw: true,
    },
    {
        name: 'electricity',
        description: 'Electrical energy generated from various sources.',
        basePricePerUnit: 0.25,
        pricePerUnit: 0.25,
        unitOfMeasurement: UnitOfMeasurement.KWH,
        isRaw: false,
    },
    {
        name: 'petrol',
        description: 'Refined fuel used for combustion engines.',
        basePricePerUnit: 1.5,
        pricePerUnit: 1.5,
        unitOfMeasurement: UnitOfMeasurement.LITER,
        isRaw: false,
    },
    {
        name: 'diesel',
        description: 'Refined fuel for heavy vehicles and generators.',
        basePricePerUnit: 1.45,
        pricePerUnit: 1.45,
        unitOfMeasurement: UnitOfMeasurement.LITER,
        isRaw: false,
    },
    {
        name: 'hydrogen',
        description: 'Clean energy carrier used in fuel cells.',
        basePricePerUnit: 6,
        pricePerUnit: 6,
        unitOfMeasurement: UnitOfMeasurement.KG,
        isRaw: false,
    },
    {
        name: 'steel',
        description: 'Processed metal alloy derived from iron.',
        basePricePerUnit: 700,
        pricePerUnit: 700,
        unitOfMeasurement: UnitOfMeasurement.TON,
        isRaw: false,
    },
];
