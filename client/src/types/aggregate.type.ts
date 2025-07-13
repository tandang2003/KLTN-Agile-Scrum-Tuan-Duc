import { IssuePriority, IssueTag } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'

type IssueAggregateType = {
  issue: {
    id: Id
    name: string
  }
  aggregate: [
    IssueAggregateProcessType,
    IssueAggregateProcessType,
    IssueAggregateProcessType
  ]
}

type IssueAggregateProcessType = {
  type: IssueTag
  priority: IssuePriority
  numOfAffectVersions: number
  numOfFixVersions: number
  numOfLink: number
  numOfBlocked: number
  numOfBlock: number
  numOfComment: number
  numOfChangeFixVersion: number
  numOfChangeOfPriority: number
  numOfChangeOfDescription: number
  complexityOfDescription: number
  complatibleOfAssignee: number
}

type SprintAggregateType = {
  id: Id
  duration: number
  issuesStarted: number
  issuesAdded: number
  issuesRemoved: number
  issuesTodo: number
  issuesInProgress: number
  issueDone: number
  members: number
}

type SprintAggregateProcessType = [
  SprintAggregateType,
  SprintAggregateType,
  SprintAggregateType
]

export type {
  SprintAggregateType,
  SprintAggregateProcessType,
  IssueAggregateType,
  IssueAggregateProcessType
}
