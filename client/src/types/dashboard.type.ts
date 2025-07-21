import { IssuePriority, IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'

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

type DashboardTeacherRes = {
  issueCreated: number
  issueDone: number
  issueFailed: number
  projects: number
  avgMember: number
  byStatusPerStudent: {
    assignee: {
      uniId: Id
      name: string
    }
    total: number
    done: number
    failed: number
  }[]
  byStatusPerProject: {
    id: Id
    name: string
    status: {
      todo: number
      inProcess: number
      review: number
      done: number
    }
  }[]
}

type IssueTrendItem = {
  process: string
  issuesAdded: number
  issuesRemoved: number
}

type WorkloadDataItem = {
  assignee: {
    uniId: string
    name: string
  }
  total: number
  done: number
  failed: number
}

type WorkloadDataItemDetail = {
  assignee: {
    uniId: string
    name: string
  }
  todo: number
  inProcess: number
  review: number
  done: number
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
  IssueStatusTrendItem,
  WorkloadDataItemDetail
}
