export default function SideLogo() {
  return (
    <div className="flex flex-col justify-center bg-sky-200">
      <div className="mx-20 mb-8 flex flex-col">
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
  )
}
