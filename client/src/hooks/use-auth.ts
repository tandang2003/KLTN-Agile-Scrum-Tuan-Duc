import { useAppSelector } from '@/context/redux/hook'
import { RoleType } from '@/types/auth.type'
import { Id } from '@/types/other.type'

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
    hasRequiredRole: hasRequiredRole ?? false,
    userRole: role
  }
}

type UseAuthResult = {
  isLoading: boolean
  isAuthenticated: boolean
  accessToken?: string
  user?: {
    id: Id
    name: string
    uniId: string
    role: RoleType
    avatar?: string
  }
}

const useAuth = (): UseAuthResult => {
  const {
    isAuth,
    loading: isLoading,
    user,
    accessToken
  } = useAppSelector((state) => state.authSlice)

  return {
    isAuthenticated: isAuth ?? false,
    isLoading: isLoading,
    user: user,
    accessToken: accessToken
  }
}

export { useAuth }

export default useAuthGuard
