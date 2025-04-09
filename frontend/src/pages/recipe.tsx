import { useNavigate, useParams } from "react-router"
import useGetFetch from "../hooks/useGetFetch"
import { Recipe } from "../types/recipe"
import getImageURL from "../utils/getImageURL";

export default function RecipePage() {
  const { id } = useParams()
  const navigate = useNavigate();
  const { data } = useGetFetch<Recipe>(`recipes/${id}`)

  console.log(data,id)
  
  return (
    <div className="max-w-2xl mx-auto my-10 px-4">
      <div className="my-4" onClick={() => navigate(-1)}>
        Atras
      </div>
      <div className="flex justify-center">
        <img src={getImageURL(data?.image_url)} alt="" />
      </div>
      <h2 className="text-7xl text-center my-10">{data?.title}</h2>
      <div className="mb-8">
        <ul className="flex">
          {data?.tag?.map((tag, index) => (
            <li key={`tag-${index}`} className="mx-3 first:ml-0">#{tag}</li>
          ))}
        </ul>
      </div>
      <p>
        {data?.description}
      </p>
      <div className="my-8">
        <p className="text-xl">Ingredientes</p>
        <ul className="pl-8 list-disc pt-3">
          {data?.ingredients?.map((ingredient, index) => (
            <li key={`ingredient-${index}`} className="py-2">{ingredient}</li>
          ))}
        </ul>
      </div>
      {data?.notes && <div className="my-8">
        Notas
        <p>{data?.notes}</p>
      </div>}
      <div className="my-8">
        <p className="text-xl">Pasos</p>
        <ul className="pl-8 list-decimal pt-3">
          {data?.steps?.map((step, index) => (
            <li key={`step-${index}`} className="py-2">{step}</li>
          ))}
        </ul>
      </div>
      <div className="my-8">
        <p className="text-xl">Notas</p>
        <p>
          {data?.description}
        </p>
      </div>
    </div>
  )
}