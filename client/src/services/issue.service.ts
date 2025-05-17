import { issueData } from '@/assets/issue.data'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { CreateIssueRequest, IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'

const issueService = {
  getIssues: (sprintId: Id): Promise<IssueResponse[]> => {
    return new Promise((resolved, _) => {
      const data = issueData.filter((item) => item.sprintId === sprintId)
      setTimeout(() => {
        resolved(data)
      }, 500)
    })
  },
  createIssue: async (req: CreateIssueRequest) => {
    const res = await httpService.post<ResponseApi<void>, CreateIssueRequest>(
      '/issue',
      req
    )
    return res.data.data
  }
}
export default issueService
