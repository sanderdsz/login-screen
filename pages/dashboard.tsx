import {parseCookies} from 'nookies'
import SideLogo from "../components/SideLogo";
import {useAuth} from "../contexts/AuthContext";
import {useEffect} from "react";

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {},[])

  return (
    <div className='h-screen flex flex-row'>
      <div className='w-auto flex justify-center'>
        <SideLogo/>
      </div>
      <div className='w-full flex justify-center items-center bg-slate-100'>
           <span className="pb-2 text-2xl text-slate-600 font-['Poppins'] font-bold">
             Hello { user.email }
            </span>
      </div>
    </div>
  )
}
