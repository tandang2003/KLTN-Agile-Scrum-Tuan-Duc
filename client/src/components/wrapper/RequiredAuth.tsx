import { useAppSelector } from '@/context/redux/hook'
import { HOME_PATH } from '@/lib/const'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

type RequiredAuthProps = {
  children: React.ReactNode
  nav?: boolean
}
const RequiredAuth = ({ children, nav = false }: RequiredAuthProps) => {
  const accessToken = useAppSelector((state) => state.authSlice.accessToken) // adjust this to your state
  const location = useLocation()

  if (!accessToken) {
    // redirect to login, keep current location for after login redirect
    if (nav)
      return <Navigate to={HOME_PATH} state={{ from: location }} replace />
    return null
  }

  return children
}

export default RequiredAuth
