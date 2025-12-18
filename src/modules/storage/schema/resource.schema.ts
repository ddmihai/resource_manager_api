import { z } from 'zod';
import { IUnitOfMeasurement } from '../types/storage';


export const CreateResourceSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        description: z.string().min(20),
        unitOfMeasurement: z.nativeEnum(IUnitOfMeasurement),
        pricePerUnit: z.number().positive(),
        image: z.string().url().optional(),
    }),
});
