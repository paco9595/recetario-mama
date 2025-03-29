import { SubmitHandler, useForm } from "react-hook-form"
import IncreaseList from "./increaseList"
import { useSearchParams } from "react-router"
import { useEffect } from "react"
import { Recipe } from "../types/recipe"

type Inputs  = {
  title: string
  description: string
  ingredients: string[]
  steps: string[]
}

interface FormRecipeProps {
  defaultValues: Recipe | null,
  onSubmit:(value: Recipe)=>void
}

export default function FormRecipe({defaultValues, onSubmit}: FormRecipeProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<Recipe>({ defaultValues : defaultValues || {} })
  const {title, description, ingredients, steps} = defaultValues || {};
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(getValues('ingredients'))
    const subscription = watch((value, { name }) =>{
      if(!name || !value) return;
      setSearchParams((prev) => {

        prev.set(name as string, value[name] as string);
        return prev;
      }, {replace: true});
  
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const changeListHandler = (property: keyof Inputs, value: string | string[]) => {
    if(Array.isArray(value)) {
      setValue(property, [...getValues(property), ...value], { shouldValidate: true});
    } else {
      setValue(property, [...getValues(property), value], { shouldValidate: true});
    }
  }

  const onSubmitHandler: SubmitHandler<Recipe>= (data)=> {
    if(data.ingredients.length === 0) {
      setError('ingredients', {message: 'al menos tiene que tener un ingrediente'})
      return
    } else {
      clearErrors(['ingredients'])
    }
    if(data.steps.length === 0) {
      setError('steps', {message: 'al menos tiene que tener un paso'})
      return
    }else {
      clearErrors(['steps'])
    }
    onSubmit(data)
  }

  const newRecipeHandler=()=>{}
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="my-4">
        {title}
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
      <button onClick={newRecipeHandler}>Crear</button>
    </form>
  )
}