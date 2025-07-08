import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'

type ColumnModelType = {
  name: string
  cardIds: Id[]
}

type CardModelType = {
  id: Id
  name: string
  numComment?: number
  numAttach?: number
  numAssigner?: number
  status: IssueStatus
}

type ColumnsType = Record<Id, ColumnModelType>

type BoardModelType = {
  columns: ColumnsType
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
  CreateCardReqType,
  ColumnsType
}
