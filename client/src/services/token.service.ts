import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'
import { TokenProjectResponse } from '@/types/project.type'

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
  },
  getTokenProject: async (workspaceId: Id) => {
    const response = await httpService.get<ResponseApi<TokenProjectResponse>>(
      `/workspace/project/user-info?workspaceId=${workspaceId}`
    )
    return response.data
  }
}

export default tokenService
