import { Id } from '@/types/other.type'

type ColumnModelType = {
  key: ColumnsKey
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

type ColumnsKey = 'backlog' | 'todo' | 'doing' | 'review' | 'done'

type BoardModelType = {
  columns: Record<ColumnsKey, ColumnModelType>
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
  ColumnsKey as ColumnsName
}
