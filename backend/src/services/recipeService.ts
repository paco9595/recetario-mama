import { sql } from "../sqlConnection";
interface Recipe {
  title?: string;
  description?: string;
  portions?: string;
  time?: string;
  ingredients?: string[];
  steps?: string[];
  file?: File;
  note?: string,
  userId?: string | null;
  image_url?: string;

}


export async function getAllRecipesService(userId: string, q: undefined): Promise<Recipe[]>;
export async function getAllRecipesService(userId: string, q: string): Promise<Recipe[]>;

export async function getAllRecipesService(userId: unknown, q: unknown): Promise<Recipe[]> {
  return await sql`
    SELECT
    r.id,
    r.name,
    r.description,
    r.image_url,
    r.portion,
    r.duration_minutes,
    r.is_public,
    r.created_at,
    r.updated_at,
    json_agg(
      json_build_object(
        'id', t.id,
        'name', t.name
      )
    ) FILTER (WHERE t.id IS NOT NULL) AS tags
    FROM recipes r
    LEFT JOIN recipetags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE r.user_id = ${userId}
    GROUP BY r.id
    ORDER BY r.created_at DESC;    
  `;
}

export async function getRecipeByIdService(id: string, userId: string): Promise<Recipe[]> {
  return await sql`
  SELECT 
  r.id,
  r.user_id,
  r.name,
  r.description,
  r.portion,
  r.image_url,
  r.duration_minutes,
  r.is_public,
  r.created_at,
  r.updated_at,

  -- Tags
  (
    SELECT json_agg(
      json_build_object(
        'id', t.id,
        'name', t.name
      )
    )
    FROM recipetags rt
    JOIN tags t ON rt.tag_id = t.id
    WHERE rt.recipe_id = r.id
  ) AS tags,

  -- Ingredientes
  (
    SELECT json_agg(
      json_build_object(
        'id', i.id,
        'name', i.name,
        'quantity', i.quantity
      ) ORDER BY i.id
    )
    FROM ingredients i
    WHERE i.recipe_id = r.id
  ) AS ingredients,

  -- Pasos
  (
    SELECT json_agg(
      json_build_object(
        'id', s.id,
        'step_number', s.position,
        'instruction', s.description
      ) ORDER BY s.position
    )
    FROM steps s
    WHERE s.recipe_id = r.id
  ) AS steps,
   -- Notas
   (
    SELECT json_agg(
      json_build_object(
        'id', n.id,
        'note', n.note
      ) ORDER BY n.id
    )
    FROM notes n
    WHERE n.recipe_id = r.id
  ) AS notes

FROM recipes r
WHERE r.id = ${id} and user_id = ${userId}`
}
export async function getIngredientsByRecipeService(recipeId: string): Promise<Recipe[]> {
  return await sql`
    SELECT
    r.id AS recipe_id,
    r.name,
    r.description,
    r.image_url,
    r.duration_minutes,
    r.is_public,
    r.created_at,
    r.updated_at,
    json_agg(
      json_build_object(
        'id', t.id,
        'name', t.name
      )
    ) FILTER (WHERE t.id IS NOT NULL) AS tags
    FROM recipes r
    LEFT JOIN recipetags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE r.user_id = 'user_2vjyc0tFUkBoTTfLNxSSQOknwh7'
    GROUP BY r.id
    ORDER BY r.created_at DESC;
  `
}



export async function createRecipeService(recipe: Recipe): Promise<{ id: string }[]> {
  const { title, description, steps, ingredients, userId, image_url, note, time } = recipe

  const result = await sql`
      INSERT INTO recipes (
        id,
        user_id,
        name,
        description,
        image_url,
        duration_minutes,
        is_public,
        created_at,
        updated_at
      )
      VALUES (
        gen_random_uuid(),
        ${userId},
        ${title},
        ${description},
        ${image_url},
        ${time},
        TRUE,
        NOW(),
        NOW()
      )
      RETURNING id;
    `;

  const recipeId = result[0].id;

  ingredients?.map(async (name) => (
    await sql`
        INSERT INTO ingredients (recipe_id, name, quantity)
        VALUES ( ${recipeId}, ${name}, 'to taste');
      `
  ))
  steps?.map(async (step, index) => (
    await sql`
        INSERT INTO steps ( recipe_id, position, description)
        VALUES (${recipeId}, ${index}, ${step});
      `
  ))

  if (note) {
    await sql`
      INSERT INTO notes (recipe_id, note)
      VALUES (${recipeId}, ${note});
    `;
  }
  return result
}