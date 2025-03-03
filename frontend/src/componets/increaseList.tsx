import { useEffect, useRef, useState } from "react"
import { FieldError } from "react-hook-form"

export default function IncreaseList({ label, changeList, error, defaultValue }: { defaultValue: string[], label: string, error: (FieldError | undefined)[], changeList: (value: string) => void }) {
  const inputRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<string[]>(defaultValue)
  const [value, setValue] = useState('')

  const addHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (value === '') return
    setState((old: string[]) => [...old, value])
    setValue('')
    changeList(value)
    inputRef?.current?.focus()
  }

  const removeHandler = (position: number) => {
    const removedItem = state.filter((_item, index) => index !== position)
    setState(removedItem)
    changeList(removedItem)
  }

  const enterHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && value !== '') {
      setState((old: string[]) => [...old, value])
      setValue('')
    }
  }

  return (
    <div>
      <div className="my-4 ">
        <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <ul>
          {state.map((item, key) => (
            <li key={key} className="bg-gray-400 hover:bg-gray-700 my-2 py-2 px-4 rounded flex justify-between">
              <div>
                {item}
              </div>
              <div onClick={() => removeHandler(key)}>X</div>
            </li>
          ))}
        </ul>
        <input ref={inputRef} value={value} onKeyDown={enterHandler} onChange={(e) => setValue(e.target.value)} autoCorrect="false" type="text" id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={label} />
        {error?.message && (<p>{error.message}</p>)}
      </div>
      <button onClick={addHandler} className="bg-blue-500 text-white px-4 py-2 rounded">
        Agregar
      </button>
    </div>
  )
}