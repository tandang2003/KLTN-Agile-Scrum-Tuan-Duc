import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { logoutThunk } from '@/feature/auth/auth.slice'
import { HOME_PATH } from '@/constant/app.const'
import { ComponentProps, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import messages from '@/constant/message.const'

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
        toast.success(messages.component.logoutButton.toast)
      })
      navigate(HOME_PATH, { replace: true })
    }
    return (
      <Button {...props} ref={ref} onClick={handleLogout}>
        {messages.component.logoutButton.title}
      </Button>
    )
  }
)
LogoutButton.displayName = 'LogoutButton'
export default LogoutButton
