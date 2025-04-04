import { useForm } from "react-hook-form"
import IncreaseList from "../componets/increaseList"
import { useNavigate, useSearchParams } from "react-router"
interface Inputs {
  title: string;
  description: string;
  ingredients: string | string[];
  steps: string | string[];

}

export default function NewRecipePage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "";
  const description = searchParams.get("description") || "";
  const ingredients = searchParams.get("ingredients")?.split(',') || [];
  const steps = searchParams.get("steps")?.split(',') || [];

  const {
    register,
    setError,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title,
      description,
      ingredients,
      steps,
    }
  })

  const navigate = useNavigate();

  const newRecipeHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const { ingredients, steps, title, description } = getValues()
    console.log({ ingredients, steps, title, description });
    if (ingredients.length === 0) {
      setError('ingredients', { message: 'al menos tiene que tener un ingrediente' })
      return
    } else {
      clearErrors(['ingredients'])
    }
    if (steps.length === 0) {
      setError('steps', { message: 'al menos tiene que tener un paso' })
      return
    } else {
      clearErrors(['steps'])
    }
    const { id, error } = await fetch(`${import.meta.env.VITE_URL_BASE_ENDPOINT}/api/recipes/new`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        steps,
        ingredients
      })
    }).then(async (res) => { 
      const data = await res.json();
      console.log(data); 
      return data; 
    })
    if (!error) {
      // console.log({ id })
      navigate(`/recipe/${id}`)
    }
    // console.log(id, error)

  }

  const changeListHandler = (property: keyof Inputs, value: string | string[]) => {

    console.log({ getValue: getValues(property), value, property })
    if (Array.isArray(value)) {
      setValue(property, [...getValues(property), ...value], { shouldValidate: true });
    } else {
      setValue(property, [...getValues(property), value], { shouldValidate: true });
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 my-10">
      <div onClick={() => navigate('/')}>
        Atras
      </div>
      <h2 className="text-7xl text-center mb-10">Nueva Receta</h2>
      <form>
        <div className="my-4">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
          <input {...register("title", { required: true })} autoCorrect="false" type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          {errors.title && <span className="text-red-300">El titulo es requerido</span>}
        </div>
        <div className="my-4">
          <p>{description}</p>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descriptcion</label>
          <textarea {...register("description", { required: true })} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
          {errors.description && <span className="text-red-300">descripcion requerida</span>}
        </div>
        <IncreaseList
          label={'Ingredientes'}
          error={errors.ingredients}
          defaultValue={ingredients}
          changeList={(value: string | string[]) => changeListHandler('ingredients', value)}
        />
        <IncreaseList
          label={'Pasos'}
          error={errors.steps}
          defaultValue={steps}
          changeList={(value: string | string[]) => changeListHandler('steps', value)}
        />
        <div className="my-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
        </div>
        <button onClick={newRecipeHandler} >Crear</button>
      </form>
    </div>
  )
}