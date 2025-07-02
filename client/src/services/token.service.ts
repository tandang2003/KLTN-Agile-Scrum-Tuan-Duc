import { FilterSprintBoard } from '@/components/board/type'
import {
  setAuthorization,
  setProjectAuthorization
} from '@/configuration/http.config'
import { StorageItem } from '@/constant/app.const'
import { loadSessionStorage, toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'
import { TokenProject, TokenProjectResponse } from '@/types/project.type'

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
  },
  setTokenProjectSession: (data: TokenProject) => {
    sessionStorage.setItem(StorageItem.ProjectToken, JSON.stringify(data))
    setProjectAuthorization(data.token)
  },
  getTokenProjectSession: (): TokenProject | null => {
    const session = sessionStorage.getItem(StorageItem.ProjectToken)
    if (!session) return null
    try {
      return JSON.parse(session)
    } catch (_) {
      return null
    }
  },
  setWorkspaceLatest: (workspaceId: Id) => {
    sessionStorage.setItem(StorageItem.ProjectIdLatest, workspaceId)
  },
  getWorkspaceLatest: (): Id | null => {
    return sessionStorage.getItem(StorageItem.ProjectIdLatest)
  },
  setTokenLocal: (token: string) => {
    sessionStorage.setItem(StorageItem.AccessToken, token)
    setAuthorization(token)
  },

  removeTokenLocal: () => {
    sessionStorage.removeItem(StorageItem.AccessToken)
    setAuthorization(undefined)
  },

  restoreTokenLocal: (): string | undefined => {
    const token = loadSessionStorage(StorageItem.AccessToken, undefined)
    setAuthorization(token)
    return token
  },
  clear: () => {
    sessionStorage.clear()
  }
}

export default tokenService
