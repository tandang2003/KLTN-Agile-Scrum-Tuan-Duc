import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'

const tokenService = {
  inviteUserToProject: async (token: string, options?: object) => {
    const queryString = toQueryString({
      token
    })
    const response = await httpService.get<ResponseApi<void>>(
      `/verify/invite-token?${queryString}`,
      options
    )

    return response.data.code
  }
}

export default tokenService
