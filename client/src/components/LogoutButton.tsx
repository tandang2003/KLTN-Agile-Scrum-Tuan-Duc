import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { logoutThunk } from '@/feature/auth/auth.slice'
import { ComponentProps } from 'react'
import { toast } from 'sonner'

type LogoutButtonProps = ComponentProps<typeof Button>

const LogoutButton = ({ ...props }: LogoutButtonProps) => {
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
    <Button {...props} onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton
