import workspaceService from '@/services/workspace.service'
import { WorkspaceCardResponse } from '@/types/workspace.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getListWorkSpace: builder.query<WorkspaceCardResponse[], void>({
      async queryFn() {
        try {
          const data: WorkspaceCardResponse[] =
            await workspaceService.getListWorkSpace()
          return { data: data }
        } catch (error) {
          return { error }
        }
      }
    })
  })
})

export default workspaceApi

export const { useGetListWorkSpaceQuery } = workspaceApi
