import sprintService from '@/services/sprint.service'
import { Id } from '@/types/other.type'
import { CreateSprintRequest, SprintResponse } from '@/types/sprint.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const sprintApi = createApi({
  reducerPath: 'sprintApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Sprints'],
  endpoints: (builder) => ({
    getListSprint: builder.query<SprintResponse[], Id>({
      async queryFn(arg) {
        try {
          const data = await sprintService.getSprints(arg)
          return { data: data }
        } catch (error) {
          return { error }
        }
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map((item) => ({
              type: 'Sprints' as const,
              id: item.id
            })),
            {
              type: 'Sprints' as const,
              id: 'LIST'
            }
          ]
          return final
        }
        const final = [
          {
            type: 'Sprints' as const,
            id: 'LIST'
          }
        ]
        return final
      }
    }),
    createSprint: builder.mutation<SprintResponse, CreateSprintRequest>({
      async queryFn(arg) {
        try {
          const data = await sprintService.createSprint(arg)
          return { data: data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => {
        return [{ type: 'Sprints', id: 'LIST' }]
      }
    }),
    deleteSprint: builder.mutation<void, Id>({
      async queryFn(arg) {
        try {
          const data = await sprintService.deleteSprint(arg)
          return { data: data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => {
        return [{ type: 'Sprints', id: 'LIST' }]
      }
    })
  })
})

export default sprintApi

export const {
  useGetListSprintQuery,
  useCreateSprintMutation,
  useDeleteSprintMutation
} = sprintApi
