import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen w-screen text-black">
      <SignIn/>
    </div>
  )
}