import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { CreateIssueRequest, IssueResponse1 } from '@/types/issue.type'
import { Id } from '@/types/other.type'

const issueService = {
  getIssues: async (sprintId: Id, projectId: Id): Promise<IssueResponse1[]> => {
    const query = toQueryString({
      projectId: projectId,
      sprintId: sprintId
    })
    const res = await httpService.get<ResponseApi<IssueResponse1[]>>(
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
  createIssue: async (req: CreateIssueRequest): Promise<IssueResponse1> => {
    const res = await httpService.post<
      ResponseApi<IssueResponse1>,
      CreateIssueRequest
    >('/issue', req)
    return res.data.data
  }
}
export default issueService
