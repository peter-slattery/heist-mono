import {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
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

import { makeApiClient } from "../apiClient"

export type AuthContext = {
  loading: boolean
  user: User | null
  profile: UserProfile | null
  api: ReturnType<typeof makeApiClient>
  openLoginForm: typeof openLoginForm
  logout: () => Promise<void>
}

const Context = createContextWithoutDefault<AuthContext>()

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<HeistUser | null>(null)

  const jwtRef = useRef<string | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const apiClient = useMemo(
    () => makeApiClient(jwtRef.current),
    [jwtRef.current]
  )

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
      apiClient
        .userProfileGet({})
        .then((res) => {
          if (!res.profile) {
            return apiClient.userProfileCreate({}).then((res) => {
              return res.profile
            })
          } else {
            return res.profile
          }
        })
        .then((profile) => {
          setProfile(profile ?? null)
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

  return (
    <Context.Provider
      value={{
        loading,
        user,
        profile,
        openLoginForm,
        logout,
        api: apiClient,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context)
