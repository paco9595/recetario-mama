import { z } from "zod";

export type Recipe = z.infer<typeof createRecipeSchema>