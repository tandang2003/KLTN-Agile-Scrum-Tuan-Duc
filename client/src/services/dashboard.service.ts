import { DashboardRes } from '@/types/dashboard.type'
import { Id } from '@/types/other.type'

const dashboardService = {
  getDashboardRes: async (
    projectId: Id,
    sprintId?: Id
  ): Promise<DashboardRes> => {
    return new Promise((resolve) => {
      resolve({
        issueCreated: 10,
        issueDone: 7,
        issueFailed: 8,
        priority: {
          CRITICAL: 4,
          MAJOR: 10,
          BLOCKED: 15,
          MINOR: 7,
          TRIVIAL: 2
        },
        status: {
          TODO: 5,
          INPROCESS: 3,
          REVIEW: 2,
          DONE: 10
        },
        workload: [
          { assignee: 'Alice', total: 20, done: 15, failed: 5 },
          { assignee: 'Bob', total: 10, done: 7, failed: 3 },
          { assignee: 'Charlie', total: 12, done: 12, failed: 0 }
        ],
        issueTrend: [
          {
            process: '30%',
            issuesAdded: 5,
            issuesRemoved: 2
          },
          {
            process: '50%',
            issuesAdded: 6,
            issuesRemoved: 1
          },
          {
            process: '80%',
            issuesAdded: 6,
            issuesRemoved: 1
          }
        ],
        issueStatusTrend: [
          {
            process: '30%',
            issuesTodo: 4,
            issuesInProcess: 3,
            issuesReview: 2
          },
          {
            process: '50%',
            issuesTodo: 5,
            issuesInProcess: 2,
            issuesReview: 3
          },
          {
            process: '80%',
            issuesTodo: 6,
            issuesInProcess: 4,
            issuesReview: 5
          }
        ]
      })
    })
  }
}

export default dashboardService
