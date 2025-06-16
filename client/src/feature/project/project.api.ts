import { createApi } from '@reduxjs/toolkit/query/react'
import projectService from '@/services/project.service'
import {
  CreateProjectRequest,
  ProjectDetailResponse,
  ProjectResponse
} from '@/types/project.type'
import { Id } from '@/types/other.type'
import { UserResponse } from '@/types/user.type'

const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: () => ({ data: {} }), // you likely want to replace this with fetchBaseQuery if not using custom service
  tagTypes: ['Projects'],
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
      }
    })
  })
})

export default projectApi

export const {
  useCreateProjectMutation,
  useGetProjectQuery,
  useGetMembersQuery
} = projectApi
