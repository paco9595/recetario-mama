import { sql } from "../sqlConnection";
import { Recipe } from "../types/recipie";

export async function getAllRecipesService(userId: string, q: undefined): Promise<Recipe[]>;
export async function getAllRecipesService(userId: string, q: string): Promise<Recipe[]>;

export async function getAllRecipesService(userId: unknown, q: unknown): Promise<Recipe[]> {
  if (q) {
    return await sql`
      SELECT id, name, description, image_url
      FROM recipes
      WHERE user_id = ${userId} AND title ILIKE ${q + '%'}`;
  }
  else {
    return await sql`
      SELECT id, name, description, image_url
      FROM recipes
      WHERE user_id = ${userId}`;
  }
}

export async function getRecipeByIdService(id: string, userId: string): Promise<Recipe[]> {
  return await sql`
  SELECT id, name, description, image_url, ingredients, steps
  FROM recipes
  WHERE id = ${id} AND user_id = ${userId}`
}

export async function createRecipeService(recipe: Recipe): Promise<{ id: string }[]> {
  const { title, description, steps, ingredients, userId, image_url, note } = recipe
  return await sql`
  INSERT INTO recipes (title, description, steps, ingredients, user_id, image_url, note)
  VALUES (${title}, ${description}, ${steps}, ${ingredients}, ${userId}, ${image_url}, ${note})
  RETURNING id`;
}