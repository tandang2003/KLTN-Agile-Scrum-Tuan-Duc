import { CardModelType } from '@/types/card.type'
import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { TagColorTypeOf } from '@/types/tag.type'

type BoardProps = {
  columns: ColumnProps[]
}

type ColumnProps = {
  id: Id
  name: string
  itemsOrder: Id[]
  items: CardModelType[]
}

// Override here
type BaseCardProps = {
  id: Id
  columnId: Id
  name: string
  thumbnail?: string
  numComment?: number
  numAttach?: number
  assigners?: CardAssignerProps[]
  numAssigner?: number
  status: IssueStatus
  tags?: CardTagProps[]
}

type CardAssignerProps = {
  name: string
  avatar?: string
}

type CardTagProps = {
  name: string
  color: TagColorTypeOf
}

type DataOnMoveType = {
  active: Id
  columnTo: Id | null
  indexTo: number | null
}

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
  BaseCardProps,
  BoardProps,
  ColumnProps,
  DataOnMoveType,
  PositionSprint,
  PositionReq,
  NewPositionReq
}
