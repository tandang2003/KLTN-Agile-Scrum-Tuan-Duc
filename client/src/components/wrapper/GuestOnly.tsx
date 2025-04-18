import { useAppSelector } from '@/context/redux/hook'
import { HOME_PATH } from '@/lib/const'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

type GuestOnlyProps = {
  children: React.ReactNode
  nav?: boolean
}

const GuestOnly = ({ children, nav = false }: GuestOnlyProps) => {
  const user = useAppSelector((state) => state.authSlice.accessToken)
  const location = useLocation()

  if (user) {
    // redirect to login, keep current location for after login redirect
    if (nav) {
      toast.warning('You are logged in')
      return <Navigate to={HOME_PATH} state={{ from: location }} replace />
    }
    return null
  }

  return children
}

export default GuestOnly
