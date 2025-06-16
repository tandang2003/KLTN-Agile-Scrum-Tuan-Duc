import {
  NewPositionReq,
  Position,
  PositionReq,
  PositionSprint
} from '@/components/board/type'
import { DEFAULT_POSITION } from '@/lib/board.helper'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'

const boardService = {
  getPosition: async (projectId: Id): Promise<PositionSprint | null> => {
    const response = await httpService.get<PositionSprint | null>(
      `/project/${projectId}/position`
    )
    return response.data
  },

  getPositionBySprint: async ({
    projectId,
    sprintId
  }: Omit<PositionReq, 'position'>): Promise<Position> => {
    const response = await httpService.get<PositionSprint>(
      `/project/${projectId}/position`
    )
    const data = response.data
    const dataSprint = data?.[sprintId] || null
    if (!dataSprint) {
      await httpService.put<void, PositionSprint>(
        `/project/${projectId}/position`,
        {
          ...data,
          [sprintId]: DEFAULT_POSITION
        }
      )
      return DEFAULT_POSITION
    }
    return dataSprint
  },

  saveNewPositionSprint: async (
    req: Omit<NewPositionReq, 'issueId' | 'status'>
  ) => {
    const { projectId, sprintId } = req

    const responseSprint = await httpService.get<PositionSprint | null>(
      `/project/${projectId}/position`
    )

    const positionSprint: PositionSprint = responseSprint.data || {}
    const position: Position = DEFAULT_POSITION

    const positionSprintUpdated: PositionSprint = {
      ...positionSprint,
      [sprintId]: position
    }

    const response = await httpService.put<ResponseApi<void>, PositionSprint>(
      `/project/${projectId}/position`,
      positionSprintUpdated
    )
    return response.data.data
  },
  saveNewPosition: async (req: NewPositionReq) => {
    const { projectId, sprintId, issueId, status } = req
    const responseSprint = await httpService.get<PositionSprint | null>(
      `/project/${projectId}/position`
    )

    const positionSprint: PositionSprint = responseSprint.data || {}
    const position: Position = positionSprint[sprintId] || DEFAULT_POSITION

    const positionUpdated: Position = {
      ...position,
      [status]: [...(position[status] || []), issueId]
    }

    const positionSprintUpdated: PositionSprint = {
      ...positionSprint,
      [sprintId]: {
        ...positionUpdated
      }
    }

    const response = await httpService.put<ResponseApi<void>, PositionSprint>(
      `/project/${projectId}/position`,
      positionSprintUpdated
    )
    return response.data.data
  },
  savePosition: async (req: PositionReq) => {
    const { projectId, sprintId, position } = req
    const responseSprint = await httpService.get<PositionSprint | null>(
      `/project/${projectId}/position`
    )

    const positionSprint: PositionSprint = responseSprint.data || {}

    const positionUpdated: PositionSprint = {
      ...positionSprint,
      [sprintId]: position
    }

    const response = await httpService.put<ResponseApi<void>, PositionSprint>(
      `/project/${projectId}/position`,
      positionUpdated
    )
    return response.data.data
  }
}

export default boardService
