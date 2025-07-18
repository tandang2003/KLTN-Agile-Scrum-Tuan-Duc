import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'
import { UserInfoResponse, UserResponse } from '@/types/user.type'

const userService = {
  getWorkspaces: async (options?: object) => {
    const response = await httpService.get<ResponseApi<UserResponse>>(
      '/user/workspace',
      options
    )
    return response.data
  },
  checkUserExist: async (uniId: Id) => {
    const queryString = toQueryString({
      uniId
    })
    const response = await httpService.get<ResponseApi<void>>(
      `/user/check?${queryString}`
    )
    return response.data
  },
  getInfo: async () => {
    const response =
      await httpService.get<ResponseApi<UserInfoResponse>>('/user')
    return response.data
  }
}
export default userService
