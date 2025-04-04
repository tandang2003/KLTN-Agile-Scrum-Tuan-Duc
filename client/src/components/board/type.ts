import { Id } from '@/types/other.type'

export type BoardProps = {
  columns: ColumnProps[]
}

export type ColumnProps = {
  id: Id
  name: string
  itemsOrder: Id[]
  items: BaseCardProps[]
}

// Override here
export type BaseCardProps = {
  id: Id
  columnId: Id
  name: string
  thumbnail?: string
  numComment?: number
  numAttach?: number
  assigners?: [CardAssignerProps, CardAssignerProps, CardAssignerProps]
  numAssigner?: number
}

type CardAssignerProps = {
  name: string
  avatar?: string
}
