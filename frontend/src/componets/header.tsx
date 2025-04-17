import { UserButton, useUser } from "@clerk/clerk-react"
import { useLocation, useNavigate } from "react-router"

export default function Header() {
  const { pathname } = useLocation()
  const { user } = useUser()
  const navigate = useNavigate()

  const isPresentationPage = pathname === '/' || pathname === '/login'
  const isSecondPage = !isPresentationPage && pathname !== '/home'

  return (
    <>
      <nav className="flex justify-between w-full mb-6">
        <div className="font-black uppercase text-xl w-full cursor-pointer" onClick={() => navigate('/home')}>Bearpoint RECIPES</div>
        <div>
          {!user ? <button className="bg-transparent border border-black rounded-md px-4 py-1" onClick={() => navigate('/login')}>login</button>
            : isPresentationPage ? <button className="bg-transparent border border-black rounded-md px-4 py-1" onClick={() => navigate('/home')}>Inicio</button> : <UserButton showName={true} />}
        </div>
      </nav>
      {isSecondPage && <div className="my-4" onClick={() => navigate(-1)}>
        Atras
      </div>}
    </>
  )
}