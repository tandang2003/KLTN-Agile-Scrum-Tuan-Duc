import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { CreateProjectRequest, ProjectResponse } from '@/types/project.type'

const projectService = {
  createProject: async (req: CreateProjectRequest) => {
    const response = await httpService.post<
      ResponseApi<ProjectResponse>,
      CreateProjectRequest
    >(`/project`, req)

    return response.data.data
  }
}
export default projectService
