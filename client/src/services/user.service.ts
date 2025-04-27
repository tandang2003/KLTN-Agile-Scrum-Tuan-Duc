import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { UserResponse } from '@/types/user.type'

const userService = {
  getWorkspaces: async (options?: object) => {
    const response = await httpService.get<ResponseApi<UserResponse>>(
      '/user/workspace',
      options
    )
    return response.data
  }
}
export default userService
