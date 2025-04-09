import { useEffect } from 'react'
import useGetFetch from './../hooks/useGetFetch'
import { useNavigate } from 'react-router';
import { Recipe } from './../types/recipe';
import { useUser } from '@clerk/clerk-react';
import getImageURL from '../utils/getImageURL';
import FlipCard from '../componets/flipCard/flipCard';

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser()
  const navigate = useNavigate();
  useEffect(()=> {
    if(isLoaded && !isSignedIn) {
      navigate('/login')
    }
  },[isLoaded, isSignedIn])
  const {data } = useGetFetch<Recipe[]>('recipes')
  console.log(data)

  const cardClickHandler = (id:string) => {
    navigate(`/recipe/${id}`)
  }

  return (
    <div className='max-w-5xl mx-auto px-6 w-full grid auto-rows-auto gap-y-9'>
      <nav className="flex justify-between w-full my-6">
        <div className="font-black uppercase text-xl w-full">Bearpoint RECIPES</div>
        <div className="hidden md:block">
          <button className="bg-transparent border border-black rounded-md px-4 py-1" onClick={()=> navigate('login')}>login</button>
        </div>
      </nav>
      <div></div>
      <h2>Recipes:</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-9 gap-y-9'>
        {data?.map(item=> (
          <FlipCard  recipe={item} clickHandler={cardClickHandler}/>
        ))}
      </div>
    </div>
  )
}