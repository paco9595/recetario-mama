import { NextFunction, Request, Response } from "express";
import { createRecipeSchema, getRecipeSchema } from "../schemas/recipeSchema";
import { createRecipeService, getAllRecipesService, getRecipeByIdService } from "../services/recipeService";
import { Recipe } from "../types/recipie";
import { getAuth } from "@clerk/express";

// Obtener todas las recetas de un usuario
export async function getAllRecipes(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = getAuth(req);
    const recipes: Recipe[] = await getAllRecipesService(userId || '')
    res.status(200).json({
      success: true,
      data: recipes,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

// Obtener una receta específica por ID y usuario
export async function getRecipe(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = getRecipeSchema.parse(req.params)
    const { id } = validatedData;
    const { userId } = getAuth(req);
    const recipe: Recipe[] = await getRecipeByIdService(id, userId|| '');
    if (recipe.length === 0) {
      res.status(404).json({ error: "Receta no encontrada." });
      return;
    }
    res.status(200).json({
      success: true,
      data: { id: recipe[0] },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

// Crear una nueva receta
export async function createNewRecipe(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = createRecipeSchema.parse(req.body);
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