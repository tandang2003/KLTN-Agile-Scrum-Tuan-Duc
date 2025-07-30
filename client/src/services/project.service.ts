import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import {
  ProjectMessagePredictResponse,
  ProjectMessageResponse,
  ProjectMessageUpdateResponse
} from '@/types/notification.type'
import { Id } from '@/types/other.type'
import {
  CreateProjectRequest,
  InviteStudentProjectRequestType,
  ProjectDetailResponse,
  ProjectResponse
} from '@/types/project.type'
import { ResourceOfSprintResponseType } from '@/types/resource.type'
import { AppMessageCallbackType } from '@/types/socket.type'
import { UserResponse } from '@/types/user.type'
import { Client } from '@stomp/stompjs'

const projectService = {
  createProject: async (req: CreateProjectRequest) => {
    const response = await httpService.post<
      ResponseApi<ProjectResponse>,
      CreateProjectRequest
    >(`/project`, req)

    return response.data.data
  },

  getProject: async (projectId: Id) => {
    const response = await httpService.get<ResponseApi<ProjectDetailResponse>>(
      `/project/${projectId}`
    )

    return response.data.data
  },
  getMembers: async (projectId: Id) => {
    const response = await httpService.get<ResponseApi<UserResponse[]>>(
      `/project/${projectId}/members`
    )

    return response.data.data
  },
  getResources: async (projectId: Id, sprintId: Id) => {
    const response = await httpService.get<
      ResponseApi<ResourceOfSprintResponseType>
    >(`/project/${projectId}/${sprintId}/resource`)

    return response.data.data
  },
  inviteStudentToProject: async (req: InviteStudentProjectRequestType) => {
    const response = await httpService.post<
      ResponseApi<void>,
      InviteStudentProjectRequestType
    >(`/project/invite`, req)

    return response.data.data
  },

  receiveUpdate: (
    ws: Client,
    projectId: Id,
    callback: AppMessageCallbackType<ProjectMessageResponse>
  ) => {
    return ws.subscribe(`/topic/project/room/${projectId}`, (value) => {
      const body: ProjectMessageResponse = JSON.parse(value.body)
      callback({
        ...value,
        bodyParse: body
      })
    })
  }
}
function isUpdateResponse(
  res: ProjectMessageResponse
): res is { type: 'UPDATE'; message: ProjectMessageUpdateResponse } {
  return res.type === 'UPDATE'
}

function isPredictResponse(
  res: ProjectMessageResponse
): res is { type: 'PREDICT'; message: ProjectMessagePredictResponse } {
  return res.type === 'PREDICT'
}

export { isUpdateResponse, isPredictResponse }
export default projectService
