import { sql } from "../sqlConnection";
import { Recipe } from "../types/recipie";

export async function getAllRecipesService(userId: string): Promise<Recipe[]> {
  return await sql`
      SELECT id, title, description, tag, image_url
      FROM recipes
      WHERE user_id = ${userId}`;
}

export async function getRecipeByIdService(id:string, userId: string): Promise<Recipe[]> {
  return await sql`
  SELECT *
  FROM recipes
  WHERE id = ${id} AND user_id = ${userId}`
}

export async function createRecipeService(recipe: Recipe): Promise<{id: string}[]> {
  const {title, description, steps, ingredients, userId, image_url} = recipe
  return await sql`
  INSERT INTO recipes (title, description, steps, ingredients, user_id, image_url)
  VALUES (${title}, ${description}, ${steps}, ${ingredients}, ${userId}, ${image_url})
  RETURNING id`;
}