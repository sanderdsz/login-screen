import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {setupAPI} from '../services/api'
import {setCookie} from 'nookies'
import SideLogo from "../components/SideLogo";

interface UserAutentication {
  email: string,
  accessToken: string,
  refreshToken: string
}

const Home: NextPage = () => {
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    let userAutentication: UserAutentication = {
      email: '',
      accessToken: '',
      refreshToken: ''
    }

    const response = await setupAPI()
      .post('/auth/login', data)
      .then(response => {
        userAutentication = response.data

        setCookie(null, 'security.accessToken', `${userAutentication.accessToken}`, undefined)
        setCookie(null, 'security.refreshToken', `${userAutentication.refreshToken}`, undefined)

        router.push('/dashboard')
      })

    console.log(userAutentication)
  }

  return (
    <div className="h-screen flex flex-row">
      <div className='w-auto flex justify-center'>
        <SideLogo />
      </div>

      <div className='w-full flex justify-center items-center bg-slate-100'>
        <form className='flex flex-col' onSubmit={handleSubmit}>

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
            <span className="text-white font-['Poppins']">
              sign in
            </span>
          </button>

        </form>
      </div>
    </div>
  )
}

export default Home
