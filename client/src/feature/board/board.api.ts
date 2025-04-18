import boardService from '@/services/board.service'
import { BoardModelType } from '@/types/card.type'
import { Id } from '@/types/other.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getBoardByProjectId: builder.query<BoardModelType, Id>({
      async queryFn(projectId) {
        try {
          const data = await boardService.getData(projectId)
          return {
            data: data
          }
        } catch (error) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error'
            }
          }
        }
      }
    })
  })
})

export default boardApi

export const { useGetBoardByProjectIdQuery } = boardApi
