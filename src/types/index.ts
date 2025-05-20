import {  PlantCategoriesValues } from '@/constants/plantCategories';
import { z } from 'zod';


export const addPlantSchema = z.object({
  name: z.string().nonempty(),
  category: z.enum([PlantCategoriesValues[0], ...PlantCategoriesValues.slice(1)], {
    required_error: "A category must be selected.",
  }),
  stock: z.number().min(1).max(200),
  price: z.coerce.number().min(1).max(1000),
  description: z.string().nonempty(),
  image: z.string().optional()
});

export type Plant = z.infer<typeof addPlantSchema>


export type PlantResponse = Partial<Plant> & {id: string, userId: string, createdAt: Date, updatedAt: Date}