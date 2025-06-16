import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'
import {
  CreateProjectRequest,
  ProjectDetailResponse,
  ProjectResponse
} from '@/types/project.type'
import { UserResponse } from '@/types/user.type'

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
  }
}
export default projectService
