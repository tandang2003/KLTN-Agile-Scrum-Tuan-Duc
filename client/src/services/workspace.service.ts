import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { Page, ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'
import {
  CreateWorkspaceReqType,
  InviteStudentWorkspaceReqType,
  ListProjectWorkspaceReq,
  ListStudentWorkspaceReq,
  ListWorkspaceReq,
  ProjectWorkspaceDataTable,
  StudentWorkspaceDataTable,
  UpdateWorkspaceReqType,
  WorkspaceCardResponse,
  WorkspaceResponse
} from '@/types/workspace.type'

const workspaceService = {
  getListWorkSpace: async (
    req: ListWorkspaceReq
  ): Promise<Page<WorkspaceCardResponse>> => {
    const queryString = req.page ? toQueryString(req) : ''
    const response = await httpService.get<
      ResponseApi<Page<WorkspaceCardResponse>>
    >(`/workspace/list?${queryString}`)
    return response.data.data
  },

  getWorkSpace: async (id: Id): Promise<WorkspaceResponse> => {
    const response = await httpService.get<ResponseApi<WorkspaceResponse>>(
      `/workspace/${id}`
    )
    return response.data.data
  },

  createWorkspace: async (
    req: CreateWorkspaceReqType
  ): Promise<WorkspaceResponse> => {
    const response = await httpService.post<
      ResponseApi<WorkspaceResponse>,
      CreateWorkspaceReqType
    >('/workspace', req)
    return response.data.data
  },

  updatesWorkspace: async (
    workspaceId: Id,
    req: UpdateWorkspaceReqType
  ): Promise<WorkspaceResponse> => {
    const response = await httpService.put<
      ResponseApi<WorkspaceResponse>,
      UpdateWorkspaceReqType
    >(`/workspace/${workspaceId}`, req)
    return response.data.data
  },

  getListStudent: async (
    req: ListStudentWorkspaceReq
  ): Promise<Page<StudentWorkspaceDataTable>> => {
    const queryString = req.page ? toQueryString(req.page) : ''
    const response = await httpService.get<
      ResponseApi<Page<StudentWorkspaceDataTable>>
    >(`/workspace/${req.id}/student?${queryString}`)
    return response.data.data
  },

  getListProject: async (
    req: ListProjectWorkspaceReq
  ): Promise<Page<ProjectWorkspaceDataTable>> => {
    const queryString = req.page ? toQueryString(req.page) : ''
    const response = await httpService.get<
      ResponseApi<Page<ProjectWorkspaceDataTable>>
    >(`/workspace/${req.id}/project?${queryString}`)
    return response.data.data
  },

  checkUserExist: async (
    workspaceId: Id,
    uniId: Id
  ): Promise<ResponseApi<void>> => {
    const queryString = toQueryString({
      workspaceId,
      uniId
    })
    const response = await httpService.get<ResponseApi<void>>(
      `/workspace/student?${queryString}`
    )
    return response.data
  },

  inviteStudentToWorkspace: async (
    req: InviteStudentWorkspaceReqType
  ): Promise<ResponseApi<void>> => {
    const response = await httpService.post<
      ResponseApi<void>,
      InviteStudentWorkspaceReqType
    >(`/workspace/student`, req)
    return response.data
  }
}

export default workspaceService
