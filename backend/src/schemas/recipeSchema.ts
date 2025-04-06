// schemas/recipeSchema.ts
import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  steps: z.string().array().min(1, "Los pasos son requeridos"),
  ingredients: z.string().array().min(1, "Los ingredientes son requeridos"),
}).required();

export const getRecipeSchema = z.object({
  id: z.string(),
}).required()