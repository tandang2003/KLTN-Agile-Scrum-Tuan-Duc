import { useAppSelector } from '@/context/redux/hook'
import { HOME_PATH } from '@/lib/const'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

type Mode = 'hide' | 'home'

type GuestOnlyProps = {
  children: React.ReactNode
  mode?: Mode
}

const GuestOnly = ({ children, mode = 'hide' }: GuestOnlyProps) => {
  const { isAuth, loading: isLoading } = useAppSelector(
    (state) => state.authSlice
  )
  const location = useLocation()

  // Special use case because need handle navigate
  if (mode == 'home') {
    if (isLoading && typeof isAuth === 'boolean' && isAuth) {
      toast.warning('You are logged in')
      return <Navigate to={HOME_PATH} state={{ from: location }} replace />
    }
  }

  if (isAuth) {
    switch (mode) {
      case 'hide':
        return null
    }
  }

  return children
}

export default GuestOnly
