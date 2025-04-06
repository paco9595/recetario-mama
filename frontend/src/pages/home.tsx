import { useEffect } from 'react'
import useGetFetch from './../hooks/useGetFetch'
import { useNavigate } from 'react-router';
import { Recipe } from './../types/recipe';
import { useUser } from '@clerk/clerk-react';
import getImageURL from '../utils/getImageURL';

export default function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser()
  const navigate = useNavigate();
  useEffect(()=> {
    if(isLoaded && !isSignedIn) {
      navigate('/login')
    }
  },[isLoaded, isSignedIn])
  const {data } = useGetFetch<Recipe[]>('recipes')

  return (
    <div className='max-w-5xl mx-auto px-4 md:px-6 my-10'>
      <div className='mb-10'>
        <h1 className='text-7xl text-center'>Recetarios Familiar</h1>
      </div>
      <div>
        <button className='bg-red-500 w-full rounded py-2 px-4 mb-6 hover:bg-red-800' onClick={() => navigate('/recipe/new')}>nueva Receta</button>
      </div>
      <div className='grid gap-x-8 gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4'>
        {/* //TODO: loading and error messages */}
        {data && data?.map((recipe: Recipe) => (
          <div className='' key={recipe.id} onClick={() => navigate(`/recipe/${recipe.id}`)}>
            <div>
              <img src={getImageURL(recipe.image_url)} alt="" />
            </div>
            <div>
              {recipe.title}
              <p className='truncate'>
                {recipe.description}
              </p>
            </div>
            <div>
              <ul className='flex mt-2'>
                {recipe?.tag?.map((tag, key) => (
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