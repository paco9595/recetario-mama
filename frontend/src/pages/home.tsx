import { useEffect } from 'react'
import useGetFetch from './../hooks/useGetFetch'
import { useNavigate } from 'react-router';
import { Recipe } from './../types/recipe';

export default function HomePage() {
  const { data } = useGetFetch<{recipes:Recipe[]}>('recipes')
  
  const navigate = useNavigate();
  useEffect(() => {
    console.log({ data })
  }, [data])

  return (
    <div className='max-w-5xl mx-auto px-4 md:px-6 my-10'>
      <div className='mb-10'>
        <h1 className='text-7xl text-center'>Recetarios Familiar</h1>
      </div>
      <div>
        <button className='bg-red-500 w-full rounded py-2 px-4 mb-6 hover:bg-red-800' onClick={() => navigate('recipe/new')}>nueva Receta</button>
      </div>
      <div className='grid gap-x-8 gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4'>
        {data?.recipes.map((recipe) => (
          <div className='' key={recipe.id} onClick={() => navigate(`recipe/${recipe.id}`)}>
            <div>
              <img src={recipe.url} alt="" />
            </div>
            <div>
              {recipe.title}
              <p className='truncate'>
                {recipe.description}
              </p>
            </div>
            <div>
              <ul className='flex mt-2'>
                {recipe.tags.map((tag, key) => (
                  <li key={key} className='px-1'>#{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}