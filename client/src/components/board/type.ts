import { IssuePriority, IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'

// Override here
type Task = {
  id: Id
  name: string
  status: IssueStatus
  priority: IssuePriority
}

type ActionDragEnd = (data: DataOnMoveType) => Promise<void>

type DataOnMoveType = {
  active: Id
  columnTo: Id | null
  indexTo: number | null
}

type FilterSprintBoard = Partial<{
  sprintId: Id
}>

type NewPositionReq = {
  projectId: Id
  sprintId: Id
  issueId: Id
  status: IssueStatus
}

type PositionReq = {
  projectId: Id
  sprintId: Id
  position: Position
}

type Position = Record<IssueStatus, Id[]>

type PositionSprint = Record<Id, Record<IssueStatus, Id[]>>

export type {
  Position,
  Task,
  DataOnMoveType,
  PositionSprint,
  PositionReq,
  NewPositionReq,
  FilterSprintBoard,
  ActionDragEnd
}
