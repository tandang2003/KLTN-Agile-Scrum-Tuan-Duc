import workspaceService from '@/services/workspace.service'
import {
  CreateWorkspaceReqType,
  WorkspaceCardResponse,
  WorkspaceResponse
} from '@/types/workspace.type'
import { UniqueIdentifier } from '@dnd-kit/core'
import { createApi } from '@reduxjs/toolkit/query/react'

const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Workspaces'],
  endpoints: (builder) => ({
    getListWorkspace: builder.query<WorkspaceCardResponse[], void>({
      async queryFn() {
        try {
          const data: WorkspaceCardResponse[] =
            await workspaceService.getListWorkSpace()
          return { data: data }
        } catch (error) {
          return { error }
        }
      },
      providesTags(result, error, arg, meta) {
        if (result) {
          const final = [
            ...result.map((item) => ({
              type: 'Workspaces' as const,
              id: item.id
            })),
            {
              type: 'Workspaces' as const,
              id: 'LIST'
            }
          ]
          return final
        }
        const final = [
          {
            type: 'Workspaces' as const,
            id: 'LIST'
          }
        ]
        return final
      }
    }),
    getWorkspace: builder.query<WorkspaceResponse, UniqueIdentifier>({
      async queryFn(arg) {
        try {
          const data = await workspaceService.getWorkSpace(arg)
          return { data: data }
        } catch (error) {
          return { error }
        }
      }
    }),
    createWorkspace: builder.mutation<
      WorkspaceResponse,
      CreateWorkspaceReqType
    >({
      async queryFn(arg) {
        try {
          const data = await workspaceService.createWorkspace(arg)
          return {
            data: data
          }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (result, error, arg, meta) => {
        return [{ type: 'Workspaces', id: 'LIST' }]
      }
    })
  })
})

export default workspaceApi

export const {
  useGetListWorkspaceQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceQuery
} = workspaceApi
