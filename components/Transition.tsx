import {motion} from 'framer-motion'
import {useRouter} from "next/router";

const Transition = ({ children }: any) => {
  const {asPath} = useRouter()

  return (
    <motion.div
      key={asPath}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}

export default Transition;