import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'

type ColumnModelType = {
  name: string
  cardIds: Id[]
}

type CardModelType = {
  id: Id
  name: string
  status: IssueStatus
}

type ColumnsType = Record<Id, ColumnModelType>

type BoardModelType = {
  columns: ColumnsType
  cards: CardModelType[]
}

type BoardModelType_V2 = Record<IssueStatus, CardModelType[]>

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
  ColumnsType,
  BoardModelType_V2
}
