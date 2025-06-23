import issueService from '@/services/issue.service'
import {
  CreateIssueRequest,
  IssueDetailResponse,
  IssueResponse,
  UpdateIssueRequest
} from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

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
          if (axios.isAxiosError(error)) {
            return {
              error: {
                status: error.response?.status || 500,
                data: error.response?.data || 'An error occurred'
              }
            }
          }
          return {
            error: {
              status: 500,
              data: 'An unexpected error occurred'
            }
          }
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
      },
      keepUnusedDataFor: 0
    }),
    updateIssue: builder.mutation<IssueDetailResponse, UpdateIssueRequest>({
      async queryFn(arg) {
        try {
          const data = await issueService.updateIssue(arg)
          return { data: data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_, error, { id }) => {
        return error ? [] : [{ type: 'Issues', id: id }]
      }
    }),
    reopenIssue: builder.mutation<undefined, Id>({
      async queryFn(arg) {
        try {
          const data = await issueService.reopenIssue(arg)
          if (data) {
            return { data: undefined }
          }
          return { error: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_, error, id) => {
        return error ? [] : [{ type: 'Issues', id: id }]
      }
    })
  })
})
export default issueApi

export const {
  useCreateIssueMutation,
  useGetListIssueQuery,
  useGetIssueQuery,
  useLazyGetIssueQuery,
  useUpdateIssueMutation,
  useLazyGetListIssueQuery,
  useReopenIssueMutation
} = issueApi
