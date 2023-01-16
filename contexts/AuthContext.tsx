import {createContext, ReactNode, useContext, useState} from "react";
import {setupAPI} from "../services/api";
import {setCookie} from "nookies";
import Router from "next/router";
import {instanceOf} from "prop-types";

type User = {
  email: string
}

type AuthContextData = {
  user: User;
  responseError: ResponseError;
  signIn: (credentials: SignInCredentials) => Promise<void>
  isLoading: boolean
}

type AuthProviderProps = {
  children: ReactNode;
};

type SignInCredentials = {
  email: string,
  password: string
}

type ResponseError = {
    error: string,
    message: string,
    path: string,
    timestamp: string,
    trace: string
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [responseError, setResponseError] = useState<ResponseError>();
  const [isLoading, setIsLoading] = useState(false);

  async function signIn({email, password}: SignInCredentials) {
    try {
      setIsLoading(true);

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

      setIsLoading(false);

      await Router.push('dashboard');

    } catch (e: any) {
      setIsLoading(false);

      setResponseError(e.response.data);

    }
  }

  return (
    // @ts-ignore
    <AuthContext.Provider value={{ signIn, user, responseError, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}