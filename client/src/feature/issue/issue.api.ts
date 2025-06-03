import issueService from '@/services/issue.service'
import {
  CreateIssueRequest,
  IssueDetailResponse,
  IssueResponse,
  UpdateIssueRequest
} from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const issueApi = createApi({
  reducerPath: 'issueApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Issues'],
  endpoints: (builder) => ({
    getListIssue: builder.query<
      IssueResponse[],
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
    createIssue: builder.mutation<IssueResponse, CreateIssueRequest>({
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
    getIssue: builder.query<
      IssueDetailResponse,
      {
        issueId: Id
        sprintId?: Id
      }
    >({
      async queryFn({ issueId, sprintId }) {
        try {
          const data = await issueService.getIssue(issueId, sprintId)
          return { data: data }
        } catch (error) {
          return { error }
        }
      }
    }),
    updateIssue: builder.mutation<IssueDetailResponse, UpdateIssueRequest>({
      async queryFn(arg) {
        try {
          const data = await issueService.updateIssue(arg)
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
  useCreateIssueMutation,
  useGetListIssueQuery,
  useGetIssueQuery,
  useUpdateIssueMutation,
  useLazyGetListIssueQuery
} = issueApi
