import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'
import { CreateProjectRequest, ProjectResponse } from '@/types/project.type'

const projectService = {
  createProject: async (req: CreateProjectRequest) => {
    const response = await httpService.post<
      ResponseApi<ProjectResponse>,
      CreateProjectRequest
    >(`/project`, req)

    return response.data.data
  },

  getProject: async (projectId: Id) => {
    const response = await httpService.get<ResponseApi<ProjectResponse>>(
      `/project/${projectId}`
    )

    return response.data.data
  }
}
export default projectService
