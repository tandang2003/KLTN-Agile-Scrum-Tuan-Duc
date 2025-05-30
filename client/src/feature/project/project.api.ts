import { createApi } from '@reduxjs/toolkit/query/react'
import projectService from '@/services/project.service'
import { CreateProjectRequest, ProjectResponse } from '@/types/project.type'
import { Id } from '@/types/other.type'

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
    getProject: builder.query<ProjectResponse, Id>({
      async queryFn(arg) {
        try {
          const data = await projectService.getProject(arg)
          return { data }
        } catch (error) {
          return { error }
        }
      }
    })
  })
})

export default projectApi

export const { useCreateProjectMutation, useGetProjectQuery } = projectApi
