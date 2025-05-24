import issueService from '@/services/issue.service'
import {
  CreateIssueRequest,
  IssueDetailResponse,
  IssueResponse1
} from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const issueApi = createApi({
  reducerPath: 'issueApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Issues'],
  endpoints: (builder) => ({
    getListIssue: builder.query<
      IssueResponse1[],
      {
        projectId: Id
        sprintId?: Id
      }
    >({
      async queryFn({ projectId, sprintId }) {
        try {
          const data = await issueService.getIssues(projectId, sprintId)
          return { data: data }
        } catch (error) {
          return { error }
        }
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map((item) => ({
              type: 'Issues' as const,
              id: item.id
            })),
            {
              type: 'Issues' as const,
              id: 'LIST'
            }
          ]
          return final
        }
        const final = [
          {
            type: 'Issues' as const,
            id: 'LIST'
          }
        ]
        return final
      }
    }),
    createProject: builder.mutation<IssueResponse1, CreateIssueRequest>({
      async queryFn(arg) {
        try {
          const data = await issueService.createIssue(arg)
          return { data: data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => {
        return [{ type: 'Issues', id: 'LIST' }]
      }
    }),
    getIssue: builder.query<IssueDetailResponse, Id>({
      async queryFn(arg) {
        try {
          const data = await issueService.getIssue(arg)
          return { data: data }
        } catch (error) {
          return { error }
        }
      }
    })
  })
})
export default issueApi

export const {
  useCreateProjectMutation,
  useGetListIssueQuery,
  useGetIssueQuery
} = issueApi
