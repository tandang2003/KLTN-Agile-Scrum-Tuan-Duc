import httpService from '@/services/http.service'
import { LoginReq, LoginRes, LogoutReq, RegisterReq } from '@/types/auth.type'
import { ResponseApi } from '@/types/http.type'

const authService = {
  // Handle Error in view
  register: async (req: RegisterReq) => {
    const res = await httpService.post<ResponseApi<void>, RegisterReq>(
      '/auth/register',
      req
    )
    return res.data
  },
  login: async (req: LoginReq) => {
    const res = await httpService.post<ResponseApi<LoginRes>, LoginReq>(
      '/auth',
      req
    )
    return res.data
  },
  logout: async (req: LogoutReq) => {
    await httpService.post<ResponseApi<void>, LogoutReq>('auth/logout', req)
  }
}

export default authService
