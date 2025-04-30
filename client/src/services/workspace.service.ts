import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { Page, ResponseApi } from '@/types/http.type'
import {
  CreateWorkspaceReqType,
  ListStudentWorkspaceReq,
  StudentWorkspaceDataTable,
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
    return response.data.data
  },

  getWorkSpace: async (id: UniqueIdentifier): Promise<WorkspaceResponse> => {
    const response = await httpService.get<ResponseApi<WorkspaceResponse>>(
      `/workspace/${id}`
    )
    return response.data.data
  },
  createWorkspace: async (
    req: CreateWorkspaceReqType
  ): Promise<WorkspaceResponse> => {
    const response = await httpService.post<
      WorkspaceResponse,
      CreateWorkspaceReqType
    >('/workspace', req)
    return response.data
  },
  getListStudent: async (
    req: ListStudentWorkspaceReq
  ): Promise<Page<StudentWorkspaceDataTable>> => {
    const queryString = req.page ? toQueryString(req.page) : ''
    const response = await httpService.get<
      ResponseApi<Page<StudentWorkspaceDataTable>>
    >(`/workspace/${req.id}/student?${queryString}`)
    return response.data.data
  }
}

export default workspaceService
