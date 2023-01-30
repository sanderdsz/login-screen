import SideLogo from "./SideLogo";
import Transition from "../components/Transition";

const Layout = ({children}: any) => {
  return (
    <div className="h-screen flex flex-row">
      <div className='w-auto flex justify-center'>
        <SideLogo />
      </div>
        <div className='w-full flex justify-center items-center bg-slate-100'>
          <Transition>
            {children}
          </Transition>
        </div>
    </div>
  )
}

export default Layout