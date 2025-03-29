import { Request, Response } from "express";
import { dataRecipes } from "../data/recipesData";
import { sql } from "../sqlConnection";

export async function getAllRecipes(req: Request, res: Response) {
  const dataRecipes = await sql`select * from recipes`
  res.send({data:dataRecipes})
}

export async function getRecipe(req: Request, res: Response) {
  const id = req.params.id;
  console.log(id);
  const recipe = await sql`select * from recipes where id = ${id}`;
  res.send({data: recipe, error: undefined});
}


export function createNewRecipe(req: Request, res: Response) {
  const data = req.body;
  console.log(JSON.stringify(data))
  res.send({ id: 'test', error: undefined })
}

