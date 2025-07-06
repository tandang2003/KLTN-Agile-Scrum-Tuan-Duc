import { Id } from '@/types/other.type'

type IssueAggregateType = {}

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

export type { SprintAggregateType }
