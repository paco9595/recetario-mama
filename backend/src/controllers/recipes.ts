import { NextFunction, Request, Response } from "express";
import { createRecipeSchema, getAllRecipeSchema, getRecipeSchema } from "../schemas/recipeSchema";
import { createRecipeService, getAllRecipesService, getRecipeByIdService } from "../services/recipeService";
import { Recipe } from "../types/recipie";
import { ZodError } from "zod";

// Obtener todas las recetas de un usuario
export async function getAllRecipes(req: Request, res: Response, next: NextFunction) {
  const validatedData = getAllRecipeSchema.parse(req.params)
  const { userId } = validatedData;
  try {
    const recipes: Recipe[] = await getAllRecipesService(userId)
    res.status(200).json({
      success: true,
      data: { id: recipes },
      error: null,
    });
  } catch (error) {
    errorHandler(error, res);
  }
}

// Obtener una receta específica por ID y usuario
export async function getRecipe(req: Request, res: Response, next: NextFunction) {
  const validatedData = getRecipeSchema.parse(req.params)
  const { id, userId } = validatedData;
  try {
    const recipe: Recipe[] = await getRecipeByIdService(id, userId);
    if (recipe.length === 0) {
      return res.status(404).json({ error: "Receta no encontrada." });
    }
    res.status(200).json({
      success: true,
      data: { id: recipe[0]},
      error: null,
    });
  } catch (error) {
    errorHandler(error, res);
  }
}

// Crear una nueva receta
export async function createNewRecipe(req: Request, res: Response, next: NextFunction) {
  const validatedData = createRecipeSchema.parse(req.body);
  try {
    const result = await createRecipeService(validatedData)
    res.status(201).json({
      success: true,
      data: { id: result[0].id },
      error: null,
    });
  } catch (error) {
    errorHandler(error, res);
  }
}

function errorHandler(err: any, res: Response) {
  console.error("[ERROR]", err); 
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      data: null,
      error: err.errors.map(e => ({
        error: "Datos inválidos",
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  return res.status(status).json({
    success: false,
    error: message,
    data: null,
  });
}