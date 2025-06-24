import { useAppSelector } from '@/context/redux/hook'
import { RoleType } from '@/types/auth.type'
import React from 'react'

type Mode = 'hide'

type RequiredAuthNoRedirectProps = {
  children: React.ReactNode
  mode?: Mode
  roles?: RoleType[]
}
const RequiredAuthNoRedirect = ({
  children,
  mode = 'hide',
  roles = []
}: RequiredAuthNoRedirectProps) => {
  const {
    isAuth,
    user,
    loading: isLoading
  } = useAppSelector((state) => state.authSlice)
  const role = user?.role

  // No authentication, user not login success
  if (isLoading == false && typeof isAuth === 'boolean' && !isAuth) {
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

export default RequiredAuthNoRedirect
