import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { PropsWithChildren } from "react"

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { loading, user } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/" />
  return children
}