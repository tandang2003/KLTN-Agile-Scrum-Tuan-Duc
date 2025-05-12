import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'

type ColumnModelType = {
  name: string
  cardIds: Id[]
}

type CardModelType = {
  id: Id
  name: string
  point: number
  thumbnail?: string
  numComment?: number
  numAttach?: number
  numAssigner?: number
  // assigners?: Assigner[]
  // tags?: { name: string; color: TagColorKey }[]
}

type BoardModelType = {
  columns: Record<IssueStatus, ColumnModelType>
  cards: CardModelType[]
}

type Assigner = {
  name: string
  avatar?: string
}

type CreateCardReqType = {
  workspaceId: string
  projectId: string
  sprintId: string
}

export type {
  CardModelType,
  ColumnModelType,
  BoardModelType,
  Assigner,
  CreateCardReqType
}
