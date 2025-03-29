import { useEffect, useState } from "react";

type Response<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};



export default function useGetFetch<T extends Record<string, any>>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string| null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const getData = async () => {
    console.log({test:import.meta.env.URL_BASE_ENDPOINT})
    const {data, error: responseError}: Response<T>= await fetch(`${import.meta.env.VITE_URL_BASE_ENDPOINT}/api/${endpoint}`).then((res) => res.json());
    if (responseError) {
      return setError(responseError)
    }
    setData(data);
    setIsLoading(false)
  }

  useEffect(() => {
    try{
      setIsLoading(true)
      getData()
    } catch(err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, error, isLoading }
}