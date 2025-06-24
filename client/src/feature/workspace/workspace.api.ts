import { addWorkspaceItems } from '@/feature/workspace/workspace.slice'
import workspaceService from '@/services/workspace.service'
import { Page } from '@/types/http.type'
import { Id } from '@/types/other.type'
import {
  CreateWorkspaceReqType,
  ListProjectWorkspaceReq,
  ListStudentWorkspaceReq,
  ListWorkspaceReq,
  ProjectWorkspaceDataTable,
  StudentWorkspaceDataTable,
  UpdateWorkspaceReqType,
  WorkspaceResponse
} from '@/types/workspace.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Workspaces'],
  endpoints: (builder) => ({
    getListWorkspace: builder.query<Page<WorkspaceResponse>, ListWorkspaceReq>({
      async queryFn(args) {
        try {
          const data: Page<WorkspaceResponse> =
            await workspaceService.getListWorkSpace(args)
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
      },
      async onQueryStarted({ size }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (data.items)
          dispatch(
            addWorkspaceItems({
              items: data.items,
              from: data.currentPage * size
            })
          )
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
      },
      providesTags: (_, __, id) => [{ type: 'Workspaces', id }]
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
    updateWorkspace: builder.mutation<
      WorkspaceResponse,
      {
        workspaceId: Id
        payload: UpdateWorkspaceReqType
      }
    >({
      async queryFn({ workspaceId, payload }) {
        try {
          const data = await workspaceService.updatesWorkspace(
            workspaceId,
            payload
          )
          return {
            data: data
          }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_, __, { workspaceId }) => {
        return [{ type: 'Workspaces', id: workspaceId }]
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
    }),
    getListProjectWorkspace: builder.query<
      Page<ProjectWorkspaceDataTable>,
      ListProjectWorkspaceReq
    >({
      async queryFn(args) {
        try {
          const data = await workspaceService.getListProject(args)
          return { data: data }
        } catch (error) {
          return { error }
        }
      }
    }),
    getListSprintWorkspace: builder.query<
      Page<ProjectWorkspaceDataTable>,
      ListProjectWorkspaceReq
    >({
      async queryFn(args) {
        try {
          const data = await workspaceService.getListProject(args)
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
  useGetListStudentWorkspaceQuery,
  useUpdateWorkspaceMutation,
  useGetListProjectWorkspaceQuery
} = workspaceApi
