import { useAppSelector } from '@/context/redux/hook'
import { RoleType } from '@/types/auth.type'

type UseAuthGuardOptions = {
  roles?: RoleType[]
}

type UseAuthGuardResult = {
  isLoading: boolean
  isAuthenticated: boolean
  hasRequiredRole: boolean
  userRole?: RoleType
}

const useAuthGuard = ({
  roles = []
}: UseAuthGuardOptions = {}): UseAuthGuardResult => {
  const {
    isAuth,
    loading: isLoading,
    user
  } = useAppSelector((state) => state.authSlice)
  const role = user?.role

  const isAuthenticated = Boolean(isAuth)
  const hasRequiredRole = roles.length === 0 || (role && roles.includes(role))

  return {
    isLoading,
    isAuthenticated,
    hasRequiredRole,
    userRole: role
  }
}

export default useAuthGuard
