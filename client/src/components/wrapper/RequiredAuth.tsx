import { useAppSelector } from '@/context/redux/hook'
import { HOME_PATH, LOGIN_PATH } from '@/lib/const'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

type Mode = 'hide' | 'home' | 'login'

type RequiredAuthProps = {
  children: React.ReactNode
  mode?: Mode
}
const RequiredAuth = ({ children, mode = 'hide' }: RequiredAuthProps) => {
  const { isAuth, loading: isLoading } = useAppSelector(
    (state) => state.authSlice
  )
  const location = useLocation()

  if (mode === 'home' || mode === 'login') {
    console.log(isLoading, isAuth)
    console.log('isLoading', isLoading == false, !isAuth)
    if (isLoading == false && typeof isAuth === 'boolean' && !isAuth) {
      return (
        <Navigate
          to={mode === 'home' ? HOME_PATH : LOGIN_PATH}
          state={{ from: location }}
          replace
        />
      )
    }
  }

  if (!isAuth) {
    switch (mode) {
      case 'hide':
        return null
    }
  }
  return children
}

export default RequiredAuth
