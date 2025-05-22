import issueService from '@/services/issue.service'
import {
  CreateIssueRequest,
  IssueResponse,
  IssueResponse1
} from '@/types/issue.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const issueApi = createApi({
  reducerPath: 'issueApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Issues'],
  endpoints: (builder) => ({
    createProject: builder.mutation<IssueResponse1, CreateIssueRequest>({
      async queryFn(arg) {
        try {
          const data = await issueService.createIssue(arg)
          return { data: data }
        } catch (error) {
          return { error }
        }
      }
    })
  })
})
export default issueApi

export const { useCreateProjectMutation } = issueApi
