import type {NextPage} from 'next'
import SideLogo from "../components/SideLogo";
import {useAuth} from "../contexts/AuthContext";
import {useState} from "react";

interface UserAutentication {
  email: string,
  accessToken: string,
  refreshToken: string
}

const Home: NextPage = () => {
  const { signIn, responseError, isLoading } = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // @ts-ignore
  const handleSubmit = async (event) => {
    event.preventDefault()

    await signIn({ email, password })
  }

  return (
    <div className="h-screen flex flex-row">
      <div className='w-full flex justify-center items-center bg-slate-100'>
        <form className='flex flex-col absolute' onSubmit={handleSubmit}>

          <div className="pb-10 flex flex-col">
            <span className="pb-2 text-2xl text-slate-600 font-['Poppins'] font-bold">
              welcome back
            </span>
            <span className="text-slate-400 font-['DMSans']">
              please enter your details to access
            </span>
          </div>

          <div>
            <div className="pb-4">
              <input
                className="w-full py-1 px-2 text-sky-600 border-x border-y border-slate-300 rounded-md placeholder-slate-300
                 bg-slate-100 transition duration-100 shadow-sm focus:ease-in focus:outline-none
                 focus:border-sky-600 focus:ring-sky-600 placeholder:pl-1 placeholder:font-['DMSans']"
                type="text"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pb-2">
              <input
                className="w-full py-1 px-2 text-sky-600 border-x border-y border-slate-300 rounded-md placeholder-slate-300
                 bg-slate-100 transition duration-100 shadow-sm focus:ease-in focus:outline-none
                 focus:border-sky-600 focus:ring-sky-600 placeholder:pl-1 placeholder:font-['DMSans']"
                type="text"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <span className="text-sm text-slate-400 font-['DMSans']">
              forgot password?
            </span>
          </div>

          <button
            className="w-full mt-8 py-2 border-0 rounded-md bg-sky-500 transition duration-200 hover:bg-sky-700 hover:ease-in"
            type="submit"
          >
              <div className={`${ isLoading ? "opacity-100" : "opacity-0"} mt-0.5 inset-x-20 absolute transition-opacity ease-in-out delay-150 duration-300`}>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            <div className="items-center justify-center">
              <span className="text-white font-['Poppins']">
                sign in
              </span>
            </div>
          </button>
        </form>
        <div className="mt-80 flex justify-center">
          <span className={`${ responseError ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out delay-150 duration-300 pt-4 text-sm text-red-500 font-['Poppins'] font-bold `}>
             { responseError ? responseError.message : '' }
          </span>
        </div>
      </div>
    </div>
  )
}

export default Home
