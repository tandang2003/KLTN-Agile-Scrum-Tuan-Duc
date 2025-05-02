import { BaseCardProps, BoardProps } from '@/components/board/type'
import {
  Assigner,
  BoardModelType,
  CardModelType,
  ColumnModelType
} from '@/types/card.type'
import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const convert = (boardModel: BoardModelType): BoardProps => {
  const columns: ColumnModelType[] = Object.values(boardModel.process)
  return {
    columns: columns.map((column: ColumnModelType) => {
      return {
        id: column.id,
        name: column.name,
        itemsOrder: column.items.map((item) => item.id),
        items: column.items.map((item: CardModelType) => ({
          ...convertCardTypeToCardProps(item),
          columnId: column.id
        }))
      }
    })
  }
}

const convertCardTypeToCardProps = (
  cardType: CardModelType
): Omit<BaseCardProps, 'columnId'> => {
  let assigners: Assigner[]
  if (cardType.assigners?.length ?? 0 < 3)
    assigners =
      cardType.assigners?.map((item) => {
        return {
          name: item.name,
          avatar: item.avatar
        }
      }) ?? []
  else
    assigners =
      cardType.assigners?.slice(0, 3).map((item) => {
        return {
          name: item.name,
          avatar: item.avatar
        }
      }) ?? []

  return {
    assigners: assigners,
    ...cardType
  }
}

const uuid = (): string => {
  return uuidv4()
}

const invertColor = (hex: string) => {
  const r = 255 - parseInt(hex.substr(1, 2), 16)
  const g = 255 - parseInt(hex.substr(3, 2), 16)
  const b = 255 - parseInt(hex.substr(5, 2), 16)

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}
type AnyObject = { [key: string]: any }

const toQueryString = (obj: AnyObject) => {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join('&')
}

const formatDate = (
  date: Date,
  pattern: 'SHORT' | 'LONG' | string = 'SHORT'
) => {
  const patterns: Record<'SHORT' | 'LONG', string> = {
    SHORT: 'dd/MM/yyyy',
    LONG: 'HH:mm dd/MM/yyyy'
  }

  const resolvedPattern =
    pattern === 'SHORT' || pattern === 'LONG' ? patterns[pattern] : pattern

  return format(date, resolvedPattern)
}
export { uuid, cn, toQueryString, invertColor, convert, formatDate }
