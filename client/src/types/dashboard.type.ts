import { IssuePriority, IssueStatus } from '@/types/model/typeOf'

type DashboardRes = {
  issueCreated: number
  issueDone: number
  issueFailed: number
  status: Record<IssueStatus, number>
  workload: WorkloadDataItem[]
  priority: Record<IssuePriority, number>
  issueTrend?: IssueTrendItem[]
  issueStatusTrend?: IssueStatusTrendItem[]
}

type IssueTrendItem = {
  process: string
  issuesAdded: number
  issuesRemoved: number
}

type WorkloadDataItem = {
  assignee: string
  total: number
  done: number
  failed: number
}

type IssueStatusTrendItem = {
  process: string
  issuesTodo: number
  issuesInProcess: number
  issuesReview: number
}

export type {
  DashboardRes,
  WorkloadDataItem,
  IssueTrendItem,
  IssueStatusTrendItem
}
