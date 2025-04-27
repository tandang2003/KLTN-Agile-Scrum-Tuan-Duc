import envConfig from '@/configuration/env.config'
import { setAuthorization } from '@/configuration/http.config'
import { StorageItem } from '@/lib/const'
import httpService from '@/services/http.service'
import { LoginReq, LoginRes, LogoutReq, RegisterReq } from '@/types/auth.type'
import { ResponseApi } from '@/types/http.type'
import { toast } from 'sonner'

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
    setTokenLocal(res.data.data.access_token)
    return res.data
  },
  logout: async (req: LogoutReq) => {
    removeTokenLocal()
    await httpService.post<ResponseApi<void>, LogoutReq>('auth/logout', req)
  },
  refresh: async (): Promise<ResponseApi<LoginRes>> => {
    const response = await fetch(`${envConfig.BACKEND_URL}/auth/refresh`, {
      method: 'POST'
    })

    if (!response.ok) {
      removeTokenLocal()
      throw new Error('UnAuthorization')
    }

    const body: ResponseApi<LoginRes> = await response.json()
    const { access_token } = body.data
    setTokenLocal(access_token)
    return body
  }
}

const setTokenLocal = (token: string) => {
  sessionStorage.setItem(StorageItem.AccessToken, token)
  setAuthorization(token)
}

const removeTokenLocal = () => {
  sessionStorage.removeItem(StorageItem.AccessToken)
  setAuthorization(undefined)
  toast.error('Token expired')
}

const restoreTokenLocal = (): string | null => {
  const accessToken = sessionStorage.getItem(StorageItem.AccessToken)
  if (!accessToken) return null
  setAuthorization(accessToken)
  return accessToken
}

export { restoreTokenLocal }
export default authService
