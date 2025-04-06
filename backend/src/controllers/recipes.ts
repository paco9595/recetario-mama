import { NextFunction, Request, Response } from "express";
import { createRecipeSchema, getRecipeSchema } from "../schemas/recipeSchema";
import { createRecipeService, getAllRecipesService, getRecipeByIdService } from "../services/recipeService";
import { Recipe } from "../types/recipie";
import { getAuth } from "@clerk/express";
import path from 'node:path'

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
    const recipe: Recipe[] = await getRecipeByIdService(id, userId || '');
    if (recipe.length === 0) {
      res.status(404).json({ error: "Receta no encontrada." });
      return;
    }
    res.status(200).json({
      success: true,
      data: recipe[0],
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

// Crear una nueva receta
export async function createNewRecipe(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.body)
    const validatedData = createRecipeSchema.parse(req.body);
    const { file }: any = req.files
    const { userId } = getAuth(req);
    const date = new Date().toISOString().replace(/:/g, '-');
    const directoryPath = path.join(__dirname, '..', '..', 'static');
    const newImageName = date + file.name;
    const filePath = path.join(directoryPath, newImageName);
    console.log(filePath, newImageName);
    file.mv(filePath, async (err: any, image: any) => {
      if (err) return res.status(500).json({ messages: err.message })
      const result = await createRecipeService({ ...validatedData, steps: validatedData.steps?.split(','), ingredients: validatedData.ingredients?.split(','), userId, image_url: newImageName })
      res.status(201).json({
        success: true,
        data: { id: result[0].id },
        error: null,
      });
    })
  } catch (error) {
    next(error);
  }
}