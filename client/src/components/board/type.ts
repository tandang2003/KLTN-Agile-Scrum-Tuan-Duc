import { CardModelType } from '@/types/card.type'
import { Id } from '@/types/other.type'
import { TagColorTypeOf } from '@/types/tag.type'

export type BoardProps = {
  columns: ColumnProps[]
}

export type ColumnProps = {
  id: Id
  name: string
  itemsOrder: Id[]
  items: CardModelType[]
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

export type ButtonCreateCardProps = {
  index: number
  isOpenCard: boolean
  setOpenCard: (index: number | null) => void
}
