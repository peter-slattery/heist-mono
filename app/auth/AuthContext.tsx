import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { createContextWithoutDefault } from "../utils/createDefaultContext"
import { useEffectOnMount } from "../utils/useEffects"
import netlifyIdentity, {
  User,
  open as openLoginForm,
  close as closeLoginForm,
} from "netlify-identity-widget"
import { HeistUser, UserProfile } from "@heist/common/types"

export type AuthContext = {
  loading: boolean
  user: User | null
  profile: UserProfile | null
  openLoginForm: typeof openLoginForm
  logout: () => Promise<void>
  fetch: (input: RequestInfo, init?: RequestInit) => ReturnType<typeof fetch>
}

const Context = createContextWithoutDefault<AuthContext>()

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<HeistUser | null>(null)

  const jwtRef = useRef<string | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffectOnMount(() => {
    netlifyIdentity.on("init", (user) => {
      setUser(user as HeistUser)
      setLoading(false)
    })
    netlifyIdentity.on("login", (user) => {
      netlifyIdentity.refresh().then((jwt) => {
        const heistUser = user as HeistUser
        setUser(heistUser)
        jwtRef.current = jwt
        closeLoginForm()
      })
    })
    netlifyIdentity.init()
  })

  useEffect(() => {
    if (!user) return
    if (user.user_metadata.userId) {
      authenticatedFetch("/api/userProfileGet", {
        method: "GET",
      })
        .then(async (res) => {
          if (res.ok) {
            return res.json()
          } else {
            return authenticatedFetch("/api/userProfileCreate", {
              method: "POST",
            }).then(async () => {
              return authenticatedFetch("/api/userProfileGet", {
                method: "GET",
              })
            })
          }
        })
        .then((body) => {
          setProfile(body as UserProfile)
        })
    } else {
      throw new Error("HANDLE ME: User is authenticated without a userId")
    }
  }, [user])

  const logout = async () => {
    await netlifyIdentity.logout()
    setUser(null)
    jwtRef.current = null
  }

  const authenticatedFetch = (input: RequestInfo, init?: RequestInit) => {
    if (!user || !jwtRef.current) {
      throw new Error(
        "Attempting to call authenticatedFetch before the user is logged in"
      )
    }
    const Authorization = `Bearer ${jwtRef.current}`
    if (!init) {
      init = {
        headers: {
          Authorization,
        },
      }
    } else if (!init.headers) {
      init.headers = {
        Authorization,
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
        profile,
        openLoginForm,
        logout,
        fetch: authenticatedFetch,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context)
