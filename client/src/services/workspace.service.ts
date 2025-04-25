import { currentUser } from '@/assets/user.data'
import { workSpacesData } from '@/assets/workspace.data'
import { uuid } from '@/lib/utils'
import { WorkSpaceModel } from '@/types/model/workspace.model'
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
    // const response =
    //   await httpService.get<WorkspaceResponse[]>('/workspace/list')

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data: WorkSpaceModel | undefined = workSpacesData.find(
          (item) => item.id == id
        )
        if (data)
          resolve({
            id: data.id,
            name: data.name,
            numSprint: 10,
            timePerSprint: 10,
            dtStart: data.dtStart,
            dtEnd: data.dtEnd
          })
        reject('Not found')
      }, 1000)
    })
  },
  createWorkspace: async (
    req: CreateWorkspaceReqType
  ): Promise<WorkspaceResponse> => {
    // const response = await httpService.post<
    //   CreateWorkspaceReqType,
    //   WorkspaceResponse
    // >('/workspace', req)
    const id = uuid()
    workSpacesData.push({
      id: id,
      name: req.name,
      description: req.description,
      dtStart: req.date.from,
      dtEnd: req.date.to,
      owner: currentUser,
      numSprint: req.numSprint,
      timePerSprint: req.timePerSprint
    })

    return {
      id: id,
      name: req.name,
      dtStart: req.date.from,
      dtEnd: req.date.to,
      numSprint: req.numSprint,
      timePerSprint: req.timePerSprint
    }
  }
}

export default workspaceService
