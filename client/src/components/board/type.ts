import { Id } from '@/types/other.type'
import { TagColorTypeOf } from '@/types/tag.type'

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
  assigners?: CardAssignerProps[]
  numAssigner?: number
  category: string
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
