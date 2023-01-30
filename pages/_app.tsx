import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {AuthProvider} from "../contexts/AuthContext";
import {AnimatePresence} from "framer-motion";
import Transition from "../components/Transition";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
        <Transition>
          <Component {...pageProps} />
        </Transition>
      </AuthProvider>
  )
}
