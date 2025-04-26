import { workSpacesData } from '@/assets/workspace.data'
import httpService from '@/services/http.service'
import {
  CreateWorkspaceReqType,
  WorkspaceCardResponse,
  WorkspaceResponse
} from '@/types/workspace.type'
import { UniqueIdentifier } from '@dnd-kit/core'

const workspaceService = {
  getListWorkSpace: async (): Promise<WorkspaceCardResponse[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data: WorkspaceCardResponse[] = workSpacesData.map((item) => ({
          id: item.id,
          name: item.name,
          owner: item.owner.name
        }))
        resolve(data)
      }, 1000)
    })
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
