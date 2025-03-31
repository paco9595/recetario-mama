import { Request, Response } from "express";
import { sql } from "../sqlConnection";

export async function getAllRecipes(req: Request, res: Response) {
  const { userId } = req.params
  const dataRecipes = await sql`SELECT id, title, description, tag, image_url FROM recipes WHERE user_id = ${userId}`
  res.send({ data: dataRecipes })
}

export async function getRecipe(req: Request, res: Response) {
  const {id, userId}= req.params;
  console.log(id);
  const recipe = await sql`select * from recipes where id = ${id} and user_id = ${userId}`;
  res.send({ data: recipe, error: undefined });
}


export async function createNewRecipe(req: Request, res: Response) {
  const {title,description, steps, ingredients} = req.body;
  const returnData = await sql`INSERT INTO recipes (title, description, steps, ingredients)
  VALUES (
      ${title},
      ${description},
      ${steps},
      ${ingredients}
  );`
  console.log(returnData)
}

