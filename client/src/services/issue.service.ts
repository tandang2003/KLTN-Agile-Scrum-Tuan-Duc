import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import {
  CreateIssueRequest,
  IssueDetailResponse,
  IssueResponse,
  UpdateIssueRequest
} from '@/types/issue.type'
import { Id } from '@/types/other.type'

const issueService = {
  getIssues: async (projectId: Id, sprintId?: Id): Promise<IssueResponse[]> => {
    const query = toQueryString({
      project_id: projectId,
      sprint_id: sprintId
    })
    const res = await httpService.get<ResponseApi<IssueResponse[]>>(
      `/issue/list?${query}`
    )
    return res.data.data
    // return new Promise((resolved, _) => {
    //   const data = issueData.filter((item) => item.sprintId === sprintId)
    //   setTimeout(() => {
    //     resolved(data)
    //   }, 500)
    // })
  },
  createIssue: async (req: CreateIssueRequest): Promise<IssueResponse> => {
    const res = await httpService.post<
      ResponseApi<IssueResponse>,
      CreateIssueRequest
    >('/issue', req)
    return res.data.data
  },
  getIssue: async (id: Id): Promise<IssueDetailResponse> => {
    const res = await httpService.get<ResponseApi<IssueDetailResponse>>(
      `/issue/${id}`
    )
    return res.data.data
  },
  updateIssue: async (
    req: UpdateIssueRequest
  ): Promise<IssueDetailResponse> => {
    const res = await httpService.put<
      ResponseApi<IssueDetailResponse>,
      UpdateIssueRequest
    >(`/issue`, req)
    return res.data.data
  }
}
export default issueService
