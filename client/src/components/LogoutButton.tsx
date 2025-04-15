import React from 'react'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { logoutThunk } from '@/feature/auth/auth.slice'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
const LogoutButton = () => {
  const accessToken: string = useAppSelector(
    (state) => state.authSlice.accessToken || ''
  )
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logoutThunk({ accessToken: accessToken })).finally(() => {
      toast.success('Logout success')
    })
  }
  return (
    <Button className='ml-auto' onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton
