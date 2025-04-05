// schemas/recipeSchema.ts
import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  steps: z.string().min(1, "Los pasos son requeridos"),
  ingredients: z.string().min(1, "Los ingredientes son requeridos"),
  user_id: z.string().uuid("El ID del usuario debe ser un UUID válido"), // o z.number() si es numérico
}).required();

export const getRecipeSchema = z.object({
  id: z.string(),
  userId: z.string()
}).required()

export const getAllRecipeSchema = z.object({
  userId: z.string()
}).required()