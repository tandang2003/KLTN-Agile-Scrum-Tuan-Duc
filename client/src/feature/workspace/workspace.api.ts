import workspaceService from '@/services/workspace.service'
import { Page } from '@/types/http.type'
import { Id } from '@/types/other.type'
import {
  CreateWorkspaceReqType,
  ListStudentWorkspaceReq,
  StudentWorkspaceDataTable,
  WorkspaceCardResponse,
  WorkspaceResponse
} from '@/types/workspace.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Workspaces'],
  endpoints: (builder) => ({
    getListWorkspace: builder.query<Page<WorkspaceCardResponse>, void>({
      async queryFn() {
        try {
          const data: Page<WorkspaceCardResponse> =
            await workspaceService.getListWorkSpace()
          return { data: data }
        } catch (error) {
          console.log('error workspace api ', error)
          return { error }
        }
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.items.map((item) => ({
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
    getWorkspace: builder.query<WorkspaceResponse, Id>({
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
      invalidatesTags: () => {
        return [{ type: 'Workspaces', id: 'LIST' }]
      }
    }),
    getListStudentWorkspace: builder.query<
      Page<StudentWorkspaceDataTable>,
      ListStudentWorkspaceReq
    >({
      async queryFn(args) {
        try {
          const data = await workspaceService.getListStudent(args)
          return { data: data }
        } catch (error) {
          return { error }
        }
      }
    })
  })
})

export default workspaceApi

export const {
  useGetListWorkspaceQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceQuery,
  useGetListStudentWorkspaceQuery
} = workspaceApi
