import { useAppDispatch } from '@/context/redux/hook'
import { restoreUserThunk } from '@/feature/auth/auth.slice'
import { ReactNode, useEffect } from 'react'

type RestoreTokenProps = {
  children: ReactNode
}

const RestoreToken = ({ children }: RestoreTokenProps) => {
  return children
}

export default RestoreToken
