// schemas/recipeSchema.ts
import { z } from "zod";

const createRecipeSchemaRequired = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  steps: z.string().min(1, "Los pasos son requeridos"),
  ingredients: z.string().min(1, "Los ingredientes son requeridos"),
})

export const createRecipeSchema = createRecipeSchemaRequired.extend({
  image: z.any().optional(),
}).partial()

export const getRecipeSchema = z.object({
  id: z.string(),
}).required()