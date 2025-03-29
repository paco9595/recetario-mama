import { Request, Response } from "express";
import { dataRecipes } from "../data/recipesData";
import { sql } from "../sqlConnection";

export async function getAllRecipes(req: Request, res: Response) {
  const version = await sql`select version()`
  res.send({data:dataRecipes, version})
}

export function getRecipe(req: Request, res: Response) {
  const id = req.params.id;
  console.log(id);
  const recipe = dataRecipes.recipes.filter(recipes => recipes.id === id)[0];
  res.send({data: recipe, error: undefined});
}


export function createNewRecipe(req: Request, res: Response) {
  const data = req.body;
  console.log(JSON.stringify(data))
  res.send({ id: 'test', error: undefined })
}

