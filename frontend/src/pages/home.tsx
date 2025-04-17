import useGetFetch from './../hooks/useGetFetch'
import { useNavigate } from 'react-router';
import { Recipe } from './../types/recipe';
import FlipCard from '../componets/flipCard/flipCard';
import Spinner from '../componets/spinner';

export default function HomePage() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetFetch<Recipe[]>('recipes')

  const cardClickHandler = (id: string) => {
    navigate(`/recipe/${id}`)
  }
  return (
    <>
      <div className='flex justify-between'>
        <h2 className='my-9 text-4xl'>Recipes:</h2>
        <div className='flex items-center' onClick={()=> navigate('/recipe/new')}>
          <button>Nueva Receta</button>
        </div>
      </div>
      {isLoading ? (
        <div className='w-full flex justify-center h-full flex-auto items-center'>
          <Spinner />
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-x-9 gap-y-9'>
          {data?.map(item => (
            <FlipCard key={item.id} recipe={item} clickHandler={cardClickHandler} />
          ))}
        </div>
      )}
    </>
  )
}