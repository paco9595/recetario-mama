import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

type Response<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};



export default function usePostFetch<T extends Record<string, any>>(endpoint: string) {
  const { getToken } = useAuth()
  const { isLoaded } = useUser()
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getData = async () => {
    const token = await getToken()

    const test: Response<T> = await fetch(`${import.meta.env.VITE_URL_BASE_ENDPOINT}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    }).then((res) => res.json());

    const { data: dataResponse, error: responseError } = test

    if (responseError) {
      return setError(responseError)
    }
    setData(dataResponse);
    setIsLoading(false)
  }


  useEffect(() => {
    try {
      if (isLoaded) {
        setIsLoading(true)
        getData()
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded])

  return { data, error, isLoading }
}