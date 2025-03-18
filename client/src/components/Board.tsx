import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  closestCorners,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './Column'
import { BoardModelType, CardModelType, ColumnModelType } from '@/types/card.type'
import Card from '@/components/Card'
import { cloneDeep } from 'lodash'
type BoardProps = {
  model: BoardModelType
}

const ACTIVE_ITEM = {
  COLUMN: 'COLUMN',
  CARD: 'CARD'
} as const

type ACTIVE_ITEM_TYPE = keyof typeof ACTIVE_ITEM
const Board = ({ model }: BoardProps) => {
  const [columns, setColumns] = useState<ColumnModelType[]>(Object.values(model.process))

  // Đánh dấu Item đang được kéo (cùng 1 thời điểm chỉ có 1 Item được kéo)
  const [activeDragItemId, setActiveDragItemId] = useState<string | number | null>(null)
  // Đánh dấu đang kéo Col hoặc đang kéo Card
  const [activeDragItemType, setActiveDragItemType] = useState<ACTIVE_ITEM_TYPE | null>(null)
  const [activeDragItemData, setActiveDragItemData] = useState<any | null>(null)
  // useEffect(() => {
  //   console.log(Object.values(model.process))
  // }, [columns])

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  const findColumnByCardId = (cardId: string) => {
    return columns.find((column) => column.items.map((card) => card.id).includes(cardId))
  }

  // Khởi tạo khi bắt đầu kéo
  const handleDragStart = (event: DragStartEvent) => {
    // console.log('event drag start', event)
    setActiveDragItemId(event.active.id)
    setActiveDragItemType(() => {
      if (!event.active.data.current?.columnId) {
        return ACTIVE_ITEM.COLUMN
      } else {
        return ACTIVE_ITEM.CARD
      }
    })
    setActiveDragItemData(() => {
      return event.active.data.current
    })
  }

  // Thực hiện trong quá trình kéo
  const handleDragOver = (event: DragOverEvent) => {
    // console.log('event drag over', event)
    const { active, over } = event
    if (!active || !over) return

    // activeDraggingCardId: Id card đang kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    // overCardId: Id card bị tác động
    const { id: overCardId } = over

    // Tìm 2 column dựa theo card Id
    const activeColumn = findColumnByCardId(activeDraggingCardId as string)
    const overColumn = findColumnByCardId(overCardId as string)
    console.log('Active col', activeColumn)
    console.log('Over col', overColumn)

    if (!activeColumn || !overColumn) return

    // Xử lý drag card đi qua 2 column khác nhau
    if (activeColumn.id !== overColumn.id) {
      console.log('Difference Col')

      setColumns((prevColumns) => {
        // Tìm index của card over col bị over
        const overCardIndex = overColumn.items.findIndex((card) => card.id === overCardId)

        // Tính toán cho index của card mới
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        const newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.items.length + 1

        // console.log('isBelowItem', isBelowOverItem)
        // console.log('modifier', modifier)
        console.log('newCardIndex', newCardIndex)

        const nextColumn = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumn.find((col) => col.id === activeColumn.id)
        const nextOverColumn = nextColumn.find((col) => col.id === overColumn.id)

        if (nextActiveColumn) {
          // Xóa card ở column active
          nextActiveColumn.items = nextActiveColumn.items.filter((card) => card.id !== activeDragItemId)
        }

        if (nextOverColumn) {
          // Kiểm tra card có đang drag có tồn tại ở over col chưa?, nếu có thì phải xóa nó đi
          nextOverColumn.items = nextOverColumn.items.filter((card) => card.id !== activeDragItemId)
          console.log('nextOverColumn', nextOverColumn)
          // Thêm card đang drag vào over col theo index mới
          // console.log('data', activeDraggingCardData)
          nextOverColumn.items = [
            ...nextOverColumn.items.slice(0, newCardIndex),
            activeDraggingCardData as CardModelType,
            ...nextOverColumn.items.slice(newCardIndex)
          ]
        }
        console.log(nextColumn)
        return nextColumn
      })
    }
  }

  // Kết thúc quá trình kéo
  const handleDragEnd = (event: DragEndEvent) => {
    // console.log('event drag end', event)

    const { active, over } = event
    // Xác định sự dụng độ giữa các col và các card lẫn nhau
    if (!active || !over) return

    // Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_ITEM.CARD) {
      console.log('Drag a card')
      // activeDraggingCardId: Id card đang kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      // overCardId: Id card bị tác động
      const { id: overCardId } = over

      // Tìm 2 column dựa theo card Id
      const activeColumn = findColumnByCardId(activeDraggingCardId as string)
      const overColumn = findColumnByCardId(overCardId as string)
      console.log('Active col', activeColumn)
      console.log('Over col', overColumn)
      if (!activeColumn || !overColumn) return

      if (activeColumn.id !== overColumn.id) {
        console.log('Drag a card between 2 column diff')
      } else {
        console.log('Drag a card same column')
      }
    }

    // Xử lý kéo thả column
    if (activeDragItemType === ACTIVE_ITEM.COLUMN) {
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: 'flex', gap: '10px', padding: '20px', overflowX: 'auto' }}>
        {columns.map((col) => (
          <SortableContext key={col.id} items={col.items?.map((item) => item.id) ?? []}>
            <Column id={col.id} title={col.name} items={col.items} />
          </SortableContext>
        ))}
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_ITEM.CARD && <Card {...activeDragItemData} />}
        </DragOverlay>
      </div>
    </DndContext>
  )
}

export default Board
