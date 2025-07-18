import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'
import {
  CreateSprintRequest,
  SprintResponse,
  UpdateSprintRequest
} from '@/types/sprint.type'

const sprintService = {
  createSprint: async (req: CreateSprintRequest): Promise<SprintResponse> => {
    const response = await httpService.post<
      ResponseApi<SprintResponse>,
      CreateSprintRequest
    >('/sprint', req)
    return response.data.data
  },
  getSprints: async (workspaceId: Id): Promise<SprintResponse[]> => {
    const response = await httpService.get<
      ResponseApi<SprintResponse[] | undefined>
    >(`/sprint/list?workspace_id=${workspaceId}`)
    return response.data.data ?? []
  },
  updateSprint: async (req: UpdateSprintRequest): Promise<SprintResponse> => {
    const response = await httpService.put<
      ResponseApi<SprintResponse>,
      UpdateSprintRequest
    >(`/sprint/teacher/update`, req)
    return response.data.data
  },
  deleteSprint: async (sprintId: Id): Promise<void> => {
    await httpService.delete<ResponseApi<void>>(`/sprint/${sprintId}`)
  }
}
export default sprintService
