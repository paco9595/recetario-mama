export default function useLocalSotrage () {

  const getLocalSotrage = (key:string) => {
    return JSON.parse(window.localStorage.getItem(key) || '')
  }

  const setLocalStorage = (key: string, value: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const resetLocalStorage = () => {
    Object.keys(window.localStorage).map(key => window.localStorage.removeItem(key))

    
  }
  return {
    getLocalSotrage,
    setLocalStorage,
    resetLocalStorage
  }
}