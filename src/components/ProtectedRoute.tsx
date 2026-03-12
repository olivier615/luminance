import { useState, useEffect, type ReactNode } from 'react'
import { Navigate } from 'react-router'
import { Rings } from 'react-loader-spinner'

import { apiCheckLoginStatus } from '../apis/user'

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuth, setIsAuth] = useState<null | boolean>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiCheckLoginStatus()
        setIsAuth(true)
      } catch {
        setIsAuth(false)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Rings
        height="160"
        width="160"
        color="#5FB8AD"
        ariaLabel="loading"
      />
    </div>
  )
  if (!isAuth) return <Navigate to="/login" />

  return children
}

export default ProtectedRoute