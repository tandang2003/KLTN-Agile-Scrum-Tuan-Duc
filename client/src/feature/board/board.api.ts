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
        const data = await boardService.getData(projectId)
        console.log(data)
        return {
          data: data
        }
      }
    })
  })
})

export default boardApi

export const { useGetBoardByProjectIdQuery } = boardApi
