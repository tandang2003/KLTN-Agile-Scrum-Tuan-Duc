import { useAppSelector } from '@/context/redux/hook'
import { HOME_PATH, LOGIN_PATH } from '@/constant/app.const'
import { RoleType } from '@/types/auth.type'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

type Mode = 'hide' | 'home' | 'login'

type RequiredAuthProps = {
  children: React.ReactNode
  mode?: Mode
  roles?: RoleType[]
}
const RequiredAuth = ({
  children,
  mode = 'hide',
  roles = []
}: RequiredAuthProps) => {
  const {
    isAuth,
    loading: isLoading,
    user
  } = useAppSelector((state) => state.authSlice)
  const location = useLocation()
  const role = user?.role
  // Handle for test case navigate, user not login success
  if (mode === 'home' || mode === 'login') {
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

  // No authentication, user not login success
  if (!isAuth) {
    switch (mode) {
      case 'hide':
        return null
    }
  }

  if (roles.length === 0) return children

  // Check Role (role is exist)
  if (!(role && roles.some((item) => item == role)))
    switch (mode) {
      case 'hide':
        return null
    }

  return children
}

export default RequiredAuth
