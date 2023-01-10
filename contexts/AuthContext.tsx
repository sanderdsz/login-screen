import {createContext, ReactNode, useContext, useState} from "react";
import {setupAPI} from "../services/api";
import {setCookie} from "nookies";
import Router from "next/router";

type User = {
  email: string
}

type AuthContextData = {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode;
};

type SignInCredentials = {
  email: string,
  password: string
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  async function signIn({email, password}: SignInCredentials) {
    try {
      const response = await setupAPI()
        .post('/auth/login', {
          email,
          password
        });

      const { accessToken, refreshToken } = response.data;

      setCookie(null, 'security.accessToken', `${accessToken}`, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setCookie(null, 'security.refreshToken', `${refreshToken}`, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setUser({ email });

      await Router.push('dashboard')

    } catch (e) {
      console.log(e);
    }
  }

  return (
    // @ts-ignore
    <AuthContext.Provider value={{ signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}