import {motion} from 'framer-motion'
import {useRouter} from "next/router";
import {useEffect, useRef} from "react";


const variants = {
  initial: { x: 300, opacity: 0 },
  exit: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 }
}

const Transition = ({ children }: any) => {
  const {asPath} = useRouter()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
  })

  return (
    <motion.div
      key={asPath}
      animate="animate"
      exit="exit"
      initial="initial"
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      variants={firstRender.current ? {} : variants}
    >
      {children}
    </motion.div>
  )
}

export default Transition