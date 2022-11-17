import type {NextPage} from 'next'
import {setupAPI} from '../services/api'
import {setCookie} from 'nookies'

interface UserAutentication {
  email: string,
  accessToken: string,
  refreshToken: string
}

const Home: NextPage = () => {

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
      })

    setCookie(null, 'security.accessToken', `${userAutentication.accessToken}`, undefined)
    setCookie(null, 'security.refreshToken', `${userAutentication.refreshToken}`, undefined)

    console.log(userAutentication)
  }

  return (
    <div className="h-screen flex flex-row">
      <div className="w-1/3 flex flex-col justify-center bg-sky-200">
        <div className="ml-16 mb-8 flex flex-col">
          <span className="mb-2 text-4xl text-sky-700 font-['Poppins'] font-bold">Security first!</span>

          <span className="text-lg text-slate-700 font-['DMSans']">
          this is a study case using auth flow with {" "}
            <a
              className="text-lg text-rose-400 font-['DMSans']"
              href="https://github.com/sanderdsz/springboot-auth-api"
              target="_blank"
            >this</a> {" "}
            backend project.
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img src="lock.png" width="600px" height="600px"/>
        </div>
      </div>

      <div className='w-2/3 flex justify-center items-center bg-slate-100'>
        <form className='flex flex-col' onSubmit={handleSubmit}>

          <div className="pb-10 flex flex-col">
            <span className="pb-2 text-2xl text-slate-600 font-['Poppins'] font-bold">
              welcome back
            </span>
            <span className="text-slate-400 font-['DMSans']">
              please enter your details to see the magic
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
