import httpService from '@/services/http.service'
import { Page, ResponseApi } from '@/types/http.type'
import {
  CreateWorkspaceReqType,
  WorkspaceCardResponse,
  WorkspaceResponse
} from '@/types/workspace.type'
import { UniqueIdentifier } from '@dnd-kit/core'

const workspaceService = {
  getListWorkSpace: async (): Promise<Page<WorkspaceCardResponse>> => {
    const response =
      await httpService.get<ResponseApi<Page<WorkspaceCardResponse>>>(
        `/workspace/list`
      )
    console.log('response', response)
    return response.data.data
  },

  getWorkSpace: async (id: UniqueIdentifier): Promise<WorkspaceResponse> => {
    const response = await httpService.get<WorkspaceResponse>(
      `/workspace/${id}`
    )
    return response.data
  },
  createWorkspace: async (
    req: CreateWorkspaceReqType
  ): Promise<WorkspaceResponse> => {
    const response = await httpService.post<
      WorkspaceResponse,
      CreateWorkspaceReqType
    >('/workspace', req)
    return response.data
  }
}

export default workspaceService
