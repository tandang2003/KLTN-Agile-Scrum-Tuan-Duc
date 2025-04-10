import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'

type RegisterReq = {
  uniId: string
  name: string
  password: string
}

type RegisterRes = {
  access_token: string
  user: {
    id: string
    name: string
    uniId: string
    role: string
  }
}

type LoginReq = Omit<RegisterReq, 'name'>
const authService = {
  // Handle Error in view
  register: async (req: RegisterReq) => {
    const res = await httpService.post<ResponseApi<RegisterRes>, RegisterReq>(
      '/auth/register',
      req
    )
    return res.data
  },
  login: (req: LoginReq) => {}
}

export default authService
