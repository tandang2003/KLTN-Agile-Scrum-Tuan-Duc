import { manualAxios } from '@/configuration/http.config'
import httpService from '@/services/http.service'
import tokenService from '@/services/token.service'
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
    try {
      const response =
        await manualAxios.post<ResponseApi<LoginRes>>(`/auth/refresh`)

      const body: ResponseApi<LoginRes> = response.data
      const { access_token } = body.data
      tokenService.setTokenLocal(access_token)
      return body
    } catch (e) {
      tokenService.removeTokenLocal()
      throw new Error('UnAuthorization')
    }
  }
}

export default authService
