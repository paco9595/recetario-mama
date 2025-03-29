
import FormRecipe from "../componets/formRecipe";
import useGetFetch from "../hooks/useGetFetch";
import { Recipe } from "../types/recipe";
import { useParams } from "react-router";

export default function EditRecipePage() {
  const { id } = useParams()
  const { data } = useGetFetch<Recipe>(`recipes/${id}`)

  return (
    <div>
      <FormRecipe defaultValues={data} onSubmit={(values)=> console.log(values)}/>
    </div>
  )
}