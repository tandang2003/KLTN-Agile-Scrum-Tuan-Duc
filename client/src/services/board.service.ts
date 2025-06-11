import { Position } from '@/components/board/type'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'

const boardService = {
  // getData: (projectId: Id): Promise<BoardModelType> => {
  //   return new Promise((resolve) => {
  //     const columns: Record<Id, ColumnModelType> = issueData.reduce(
  //       (acc, data) => {
  //         if (!acc[data.status]) {
  //           acc[data.status] = {
  //             name: data.status,
  //             cardIds: []
  //           }
  //         }
  //         acc[data.status].cardIds.push(data.id)
  //         return acc
  //       },
  //       {} as Record<Id, ColumnModelType>
  //     )
  //     for (const status of issueStatusList) {
  //       if (!columns[status]) {
  //         columns[status] = {
  //           name: status,
  //           cardIds: []
  //         }
  //       }
  //     }
  //     const sortedColumns = statusOrder.reduce(
  //       (acc, key) => {
  //         acc[key] = columns[key]
  //         return acc
  //       },
  //       {} as Record<Id, ColumnModelType>
  //     )
  //     const data: BoardModelType = {
  //       columns: sortedColumns,
  //       cards: issueData.map((item) => ({
  //         id: item.id,
  //         name: item.title,
  //         point: item.storyPoint
  //       }))
  //     }
  //     setTimeout(() => {
  //       resolve(data)
  //     }, 1000)
  //   })
  // }
  getPosition: async (projectId: Id) => {
    const response = await httpService.get<ResponseApi<Position>>(
      `/project/${projectId}/position`
    )
    return response.data.data
  },
  updatePosition: async (projectId: Id, position: Position) => {
    const response = await httpService.put<ResponseApi<void>, Position>(
      `/project/${projectId}/position`,
      position
    )
    return response.data.data
  }
}

export default boardService
