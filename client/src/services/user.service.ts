import httpService from '@/services/http.service'
import { UserResponse } from '@/types/user.type'

const userService = {
  getWorkspaces: async () => {
    const response = await httpService.get<UserResponse>('/user/workspace')
    return response.data
  }
}
export default userService
