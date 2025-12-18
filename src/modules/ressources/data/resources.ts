import { IResource, IUnitOfMeasurement } from '../types/ressource';

export const RESOURCES: IResource[] = [
  {
    name: 'iron',
    description: 'Raw iron ore',
    unitOfMeasurement: IUnitOfMeasurement.TON,
    pricePerUnit: 90,
  },
  {
    name: 'silver',
    description: 'Precious metal',
    unitOfMeasurement: IUnitOfMeasurement.KG,
    pricePerUnit: 700,
  },
  {
    name: 'gold',
    description: 'High-value precious metal',
    unitOfMeasurement: IUnitOfMeasurement.KG,
    pricePerUnit: 55000,
  },
  {
    name: 'platinum',
    description: 'Rare precious metal',
    unitOfMeasurement: IUnitOfMeasurement.KG,
    pricePerUnit: 30000,
  },
  {
    name: 'wood',
    description: 'Processed timber',
    unitOfMeasurement: IUnitOfMeasurement.CUBIC_METER,
    pricePerUnit: 120,
  },
  {
    name: 'oil',
    description: 'Crude oil',
    unitOfMeasurement: IUnitOfMeasurement.LITER,
    pricePerUnit: 0.45,
  },
  {
    name: 'electricity',
    description: 'Electrical energy',
    unitOfMeasurement: IUnitOfMeasurement.KWH,
    pricePerUnit: 0.25,
  },
  {
    name: 'hydrogen',
    description: 'Clean energy fuel',
    unitOfMeasurement: IUnitOfMeasurement.KG,
    pricePerUnit: 6,
  },
  {
    name: 'petrol',
    description: 'Refined vehicle fuel',
    unitOfMeasurement: IUnitOfMeasurement.LITER,
    pricePerUnit: 1.5,
  },
  {
    name: 'coal',
    description: 'Thermal coal',
    unitOfMeasurement: IUnitOfMeasurement.TON,
    pricePerUnit: 100,
  },
];
