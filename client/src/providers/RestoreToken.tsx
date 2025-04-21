import { useAppDispatch } from '@/context/redux/hook'
import { restoreSessionThunk } from '@/feature/auth/auth.slice'
import { ReactNode, useEffect } from 'react'

type RestoreTokenProps = {
  children: ReactNode
}

const RestoreToken = ({ children }: RestoreTokenProps) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(restoreSessionThunk())
  }, [dispatch])

  return children
}

export default RestoreToken
