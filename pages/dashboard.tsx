import {parseCookies} from 'nookies'
import SideLogo from "../components/SideLogo";

export default function Dashboard() {

  return (
    <div className='h-screen flex flex-row'>
      <div className='w-auto flex justify-center'>
        <SideLogo/>
      </div>
      <div className='w-full flex justify-center items-center bg-slate-100'>
           <span className="pb-2 text-2xl text-slate-600 font-['Poppins'] font-bold">
             Hello
            </span>
      </div>
    </div>
  )
}
