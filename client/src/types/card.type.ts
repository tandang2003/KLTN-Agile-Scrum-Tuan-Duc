import { TagColorTypeOf as TagColorKey } from '@/types/tag.type'

export type CardModelType = {
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

export type ColumnModelType = {
  id: string
  name: string
  items: CardModelType[]
}

export type BoardModelType = {
  process: {
    backlog: ColumnModelType
    todo: ColumnModelType
    doing: ColumnModelType
    review: ColumnModelType
    done: ColumnModelType
  }
}

export type Assigner = {
  name: string
  avatar?: string
}
