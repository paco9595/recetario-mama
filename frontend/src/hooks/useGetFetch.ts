import { useAuth, useUser } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getRecipes } from "../services/recipieService";

type Response<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};



export default function useGetFetch<T extends Record<string, any>>(endpoint: string) {
  const { getToken } = useAuth()
  const { isLoaded } = useUser()
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getData = useCallback(async () => {
    setIsLoading(true)
    const token = await getToken()

    const RecipesResponse: Response<T> = await getRecipes(endpoint, token)
    const { data: dataResponse, error: responseError } = RecipesResponse

    if (responseError) {
      return setError(responseError)
    }

    setData(dataResponse);
    setIsLoading(false)
  },[endpoint, getToken])

  const debouncedGetData = useDebouncedCallback(getData, 1000);

  useEffect(() => {
    try {
      console.log('test ', isLoaded)
      if (isLoaded) {
        debouncedGetData()
      }
    } catch (err) {
      console.log('test 2')
      setError((err as Error).message)
    } finally {
      console.log('test 3')
      setIsLoading(false)
    }
  }, [isLoaded, debouncedGetData])

  return { data, error, isLoading }
}