import { NextFunction, Request, Response } from "express";
import { createRecipeSchema, getAllRecipeSchema, getRecipeSchema } from "../schemas/recipeSchema";
import { createRecipeService, getAllRecipesService, getRecipeByIdService } from "../services/recipeService";
import { Recipe } from "../types/recipie";

// Obtener todas las recetas de un usuario
export async function getAllRecipes(req: Request, res: Response, next: NextFunction) {
  const validatedData = getAllRecipeSchema.parse(req.query)
  const { userId } = validatedData;
  try {
    const recipes: Recipe[] = await getAllRecipesService(userId)
    res.status(200).json({
      success: true,
      data: { id: recipes },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

// Obtener una receta específica por ID y usuario
export async function getRecipe(req: Request, res: Response, next: NextFunction) {
  const validatedData = getRecipeSchema.parse(req.query)
  const { id, userId } = validatedData;
  try {
    const recipe: Recipe[] = await getRecipeByIdService(id, userId);
    if (recipe.length === 0) {
      res.status(404).json({ error: "Receta no encontrada." });
    }
    res.status(200).json({
      success: true,
      data: { id: recipe[0]},
      error: null,
    });
  } catch (error) {
    next(error);
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
    next(error);
  }
}