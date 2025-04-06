import { BaseCardProps, BoardProps } from '@/components/board/type'
import {
  Assigner,
  BoardModelType,
  CardModelType,
  ColumnModelType
} from '@/types/card.type'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convert = (boardModel: BoardModelType): BoardProps => {
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

export const uuid = (): string => {
  return uuidv4()
}

export const invertColor = (hex: string) => {
  const r = 255 - parseInt(hex.substr(1, 2), 16)
  const g = 255 - parseInt(hex.substr(3, 2), 16)
  const b = 255 - parseInt(hex.substr(5, 2), 16)

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}
