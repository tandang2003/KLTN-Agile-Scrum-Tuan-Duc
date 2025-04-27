import envConfig from '@/configuration/env.config'
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
  },
  refresh: async (): Promise<ResponseApi<LoginRes>> => {
    const response = await fetch(`${envConfig.BACKEND_URL}/auth/refresh`, {
      method: 'POST'
    })

    if (!response.ok) throw new Error('UnAuthorization')

    const body: ResponseApi<LoginRes> = await response.json()
    return body
  }
}

export default authService
