import { IssuePriority, IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'

type DashboardRes = {
  issueCreated: number
  issueDone: number
  issueFailed: number
  status: Record<IssueStatus, number>
  workload: WorkloadDataItem[]
  priority: Record<IssuePriority, number>
}

type DashboardWorkspaceResponse = {
  numOfProject: number
  maxNumMember: number
  minNumMember: number
  assigneeRate: number
  taskFinishRate: number
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
  notComplete: number
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

type ProjectWorkloadRes = {
  id: Id
  name: string
  status: Record<IssueStatus, number>
  total: number
  done: number
  notComplete: number
  taskBalance: number
}

type ProjectPredictRes = {
  id: Id
  name: string
  lastTime?: Date
  predict: -2 | -1 | 0
}

export type {
  DashboardRes,
  WorkloadDataItem,
  IssueTrendItem,
  IssueStatusTrendItem,
  WorkloadDataItemDetail,
  DashboardWorkspaceResponse,
  ProjectWorkloadRes,
  ProjectPredictRes
}
