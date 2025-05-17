import { issueData } from '@/assets/issue.data'
import { IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'

const issueService = {
  getIssues: (sprintId: Id): Promise<IssueResponse[]> => {
    return new Promise((resolved, _) => {
      const data = issueData.filter((item) => item.sprintId === sprintId)
      setTimeout(() => {
        resolved(data)
      }, 500)
    })
  }
}
export default issueService
