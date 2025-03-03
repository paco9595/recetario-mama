import { useEffect, useState } from "react";

type Response<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};



export default function useGetFetch<T extends Record<string, any>>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string| null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const getData = async () => {
    const {data, error: responseError}: Response<T>= await fetch(`https://recetario-mama-7ed2g492h-paco9595s-projects.vercel.app/api/${endpoint}`).then((res) => res.json());
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