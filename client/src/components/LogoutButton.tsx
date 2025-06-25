import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { logoutThunk } from '@/feature/auth/auth.slice'
import { HOME_PATH } from '@/lib/const'
import { ComponentProps, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type LogoutButtonProps = ComponentProps<typeof Button>

const LogoutButton = forwardRef<HTMLButtonElement, LogoutButtonProps>(
  (props, ref) => {
    const accessToken: string = useAppSelector(
      (state) => state.authSlice.accessToken ?? ''
    )
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
      dispatch(logoutThunk({ accessToken: accessToken })).finally(() => {
        toast.success('Logout success')
      })
      navigate(HOME_PATH, { replace: true })
    }
    return (
      <Button {...props} ref={ref} onClick={handleLogout}>
        Logout
      </Button>
    )
  }
)
LogoutButton.displayName = 'LogoutButton'
export default LogoutButton
