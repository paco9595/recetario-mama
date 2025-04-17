import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className=" flex justify-center w-full h-full max-h-[650px] items-center">
     <SignIn />
    </div>
  )
}