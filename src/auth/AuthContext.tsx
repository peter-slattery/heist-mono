import { useContext, useState } from 'react';
import { createContextWithoutDefault } from '../utils/createDefaultContext';
import { useEffectOnMount } from '../utils/useEffects';
import netlifyIdentity, { User, open as openLoginForm, close as closeLoginForm } from "netlify-identity-widget"

export type AuthContext = {
  loading: boolean,
  user: User | null,
  openLoginForm: typeof openLoginForm,
  logout: () => Promise<void>,
  fetch: (input: RequestInfo, init?: RequestInit) => ReturnType<typeof fetch>
}

const Context = createContextWithoutDefault<AuthContext>()

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [jwt, setJwt] = useState<string | null>(null)

  useEffectOnMount(() => {
    netlifyIdentity.on("init", (user) => {
      console.log("Log in", user)
      setUser(user)
      setLoading(false)
    })
    netlifyIdentity.on('login', (user) => {
      console.log("Log in", user)
      netlifyIdentity.refresh().then((jwt) => {
        setUser(user);
        setJwt(jwt)
        closeLoginForm();
      })
    });
    netlifyIdentity.init()
  })

  const logout = async () => {
    await netlifyIdentity.logout()
    setUser(null)
    setJwt(null)
  }

  const authenticatedFetch = (input: RequestInfo, init?: RequestInit) => {
    if (!user) {
      throw new Error("Attempting to call authenticatedFetch before the user is logged in")
    }
    const Authorization = `Bearer ${jwt}`
    if (!init) {
      init = {
        headers: {
          Authorization
        }
      }
    }
    else if (!init.headers) {
      init.headers = {
        Authorization
      }
    } else {
      throw new Error("init already had an Authorization header")
    }
    return fetch(input, init)
  }

  return (
    <Context.Provider 
      value={{
        loading,
        user,
        openLoginForm,
        logout,
        fetch: authenticatedFetch
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context)