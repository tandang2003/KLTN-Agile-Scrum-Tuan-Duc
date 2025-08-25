import { createApi } from '@reduxjs/toolkit/query/react'
import projectService from '@/services/project.service'
import {
  CreateProjectRequest,
  ProjectDetailResponse,
  ProjectResponse
} from '@/types/project.type'
import { Id } from '@/types/other.type'
import { UserResponse } from '@/types/user.type'
import { ResourceOfSprintResponseType } from '@/types/resource.type'
import { SprintResultResponse } from '@/types/sprint.type'

const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: () => ({ data: {} }), // you likely want to replace this with fetchBaseQuery if not using custom service
  tagTypes: ['Projects', 'ProjectResults'],
  endpoints: (builder) => ({
    createProject: builder.mutation<ProjectResponse, CreateProjectRequest>({
      async queryFn(arg) {
        try {
          const data = await projectService.createProject(arg)
          return { data }
        } catch (error) {
          return { error }
        }
      }
    }),
    getProject: builder.query<ProjectDetailResponse, Id>({
      async queryFn(arg) {
        try {
          const data = await projectService.getProject(arg)
          return { data }
        } catch (error) {
          return { error }
        }
      }
    }),
    getMembers: builder.query<UserResponse[], Id>({
      async queryFn(arg) {
        try {
          const data = await projectService.getMembers(arg)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      keepUnusedDataFor: 0
    }),
    getResources: builder.query<
      ResourceOfSprintResponseType,
      {
        projectId: Id
        sprintId: Id
      }
    >({
      async queryFn({ projectId, sprintId }) {
        try {
          const data = await projectService.getResources(projectId, sprintId)
          return { data }
        } catch (error) {
          return { error }
        }
      }
    }),
    getResult: builder.query<
      SprintResultResponse[],
      {
        projectId: Id
      }
    >({
      async queryFn({ projectId }) {
        try {
          const data = await projectService.getResult(projectId)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: 'ProjectResults' as const,
                id
              })),
              'ProjectResults'
            ]
          : ['ProjectResults']
      }
    }),
    clearGetResult: builder.mutation<void, void>({
      queryFn: () => ({ data: undefined }),
      invalidatesTags: ['ProjectResults']
    })
  })
})

export default projectApi

export const {
  useCreateProjectMutation,
  useGetProjectQuery,
  useLazyGetProjectQuery,
  useGetMembersQuery,
  useGetResourcesQuery,
  useGetResultQuery,
  useClearGetResultMutation
} = projectApi
