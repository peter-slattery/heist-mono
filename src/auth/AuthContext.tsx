import { useContext, useState } from 'react';
import { createContextWithoutDefault } from '../utils/createDefaultContext';
import { useEffectOnMount } from '../utils/useEffects';
import netlifyIdentity, { User, open as openLoginForm, close as closeLoginForm} from "netlify-identity-widget"

export type AuthContext = {
  loading: boolean,
  user: User | null,
  openLoginForm: typeof openLoginForm
}

const Context = createContextWithoutDefault<AuthContext>()

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffectOnMount(() => {
    netlifyIdentity.on("init", (user) => {
      console.log("Log in", user)
      setUser(user)
      setLoading(false)
    })
    netlifyIdentity.on('login', (user) => {
      console.log("Log in", user)
      setUser(user);
      closeLoginForm();
    });
    netlifyIdentity.init()
  })

  return (
    <Context.Provider 
      value={{
        loading,
        user,
        openLoginForm
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context)