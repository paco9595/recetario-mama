export function getRecipes<T>(endpoint: string, token: string| null): Promise<T> {
  return fetch(`${import.meta.env.VITE_URL_BASE_ENDPOINT}/api/${endpoint}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then((res) => res.json()); 
}