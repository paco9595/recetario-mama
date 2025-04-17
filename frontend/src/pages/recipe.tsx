import { useParams } from "react-router"
import useGetFetch from "../hooks/useGetFetch"
import { Recipe } from "../types/recipe"
import getImageURL from "../utils/getImageURL";

export default function RecipePage() {
  const { id } = useParams()
  const { data } = useGetFetch<Recipe>(`recipes/${id}`)

  console.log(data, id)

  return (
    <div className="max-w-2xl mx-auto my-10 px-4">

      <div className="flex justify-center">
        <img src={getImageURL(data?.image_url)} alt="" />
      </div>
      <h2 className="text-7xl text-center my-10">{data?.title}</h2>
      <p>
        {data?.description}
      </p>
      <div className="mt-8">
        <ul className="flex">
          {data?.tags?.map(({ id, name }) => (
            <li key={`tag-${id}`} className="mx-3 first:ml-0">#{name}</li>
          ))}
        </ul>
      </div>

      <div className="my-8">
        <p className="text-xl">Ingredientes</p>
        <ul className="pl-8 list-disc pt-3">
          {data?.ingredients?.map(({ id, name, quantity }) => (
            <li key={`ingredient-${id}`} className="py-2">{name} - {quantity}</li>
          ))}
        </ul>
      </div>
     
      <div className="my-8">
        <p className="text-xl">Pasos</p>
        <ul className="pl-8 list-decimal pt-3">
          {data?.steps?.map(({ id, instruction }) => (
            <li key={`step-${id}`} className="py-2">{instruction}</li>
          ))}
        </ul>
      </div>
      {data?.notes && <div className="my-8">
        Notas
        {data?.notes.map(({ id, note }) => (
          <p key={id}>{note}</p>
        ))}
      </div>}
    </div>
  )
}