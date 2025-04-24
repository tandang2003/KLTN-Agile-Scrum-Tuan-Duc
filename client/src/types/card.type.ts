import { TagColorTypeOf as TagColorKey } from '@/types/tag.type'

type CardModelType = {
  id: string
  name: string
  category: 'LT' | 'TH'
  point: number
  thumbnail?: string
  numComment?: number
  numAttach?: number
  numAssigner?: number
  assigners?: Assigner[]
  tags?: { name: string; color: TagColorKey }[]
}

type ColumnModelType = {
  id: string
  name: string
  items: CardModelType[]
}

type BoardModelType = {
  process: {
    backlog: ColumnModelType
    todo: ColumnModelType
    doing: ColumnModelType
    review: ColumnModelType
    done: ColumnModelType
  }
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
