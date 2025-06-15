import { Position } from '@/components/board/type'
import { DEFAULT_POSITION } from '@/lib/board.helper'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'

const boardService = {
  getPosition: async (projectId: Id): Promise<Position> => {
    const response = await httpService.get<Position | null>(
      `/project/${projectId}/position`
    )
    return response.data || DEFAULT_POSITION
  },
  savePosition: async (projectId: Id, position: Position) => {
    const response = await httpService.put<ResponseApi<void>, Position>(
      `/project/${projectId}/position`,
      position
    )
    return response.data.data
  }
}

export default boardService
