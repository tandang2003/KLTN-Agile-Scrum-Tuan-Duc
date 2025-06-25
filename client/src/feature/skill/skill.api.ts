import skillService from '@/services/skill.service'
import { SkillRequest, SkillResponse } from '@/types/skill.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const skillApi = createApi({
  reducerPath: 'skillApi',
  baseQuery: () => ({ data: {} }), // you likely want to replace this with fetchBaseQuery if not using custom service
  tagTypes: ['Skills'],
  endpoints: (builder) => ({
    getAllSkills: builder.query<Array<string>, void>({
      async queryFn() {
        try {
          const data = await skillService.getSkills()
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: () => {
        return [
          {
            type: 'Skills' as const,
            id: 'LIST'
          }
        ]
      }
    }),
    getSkills: builder.query<Array<SkillResponse>, void>({
      async queryFn() {
        try {
          const data = await skillService.getSkillsPersonal()
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: () => {
        return [
          {
            type: 'Skills' as const,
            id: 'LIST'
          }
        ]
      }
    }),
    createSkill: builder.mutation<SkillResponse, SkillRequest>({
      async queryFn(arg) {
        try {
          await skillService.createSkill(arg)
          return { data: arg }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [
        {
          type: 'Skills' as const,
          id: 'LIST'
        }
      ]
    }),

    updateSkill: builder.mutation<SkillResponse, SkillRequest>({
      async queryFn(arg) {
        try {
          await skillService.updateSkill(arg)
          return { data: arg }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [
        {
          type: 'Skills' as const,
          id: 'LIST'
        }
      ]
    }),
    deleteSkill: builder.mutation<void, SkillRequest>({
      async queryFn(arg) {
        try {
          await skillService.deleteSkill(arg)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [
        {
          type: 'Skills' as const,
          id: 'LIST'
        }
      ]
    })
  })
})

export default skillApi
export const {
  useCreateSkillMutation,
  useGetSkillsQuery,
  useGetAllSkillsQuery,
  useUpdateSkillMutation,
  useDeleteSkillMutation
} = skillApi
