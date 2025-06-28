import RenderColumns from '@/components/board/RenderColumns'
import { DataOnMoveType } from '@/components/board/type'
import KanbanCard from '@/components/kanban/KanbanCard'
import KanbanProvider from '@/components/kanban/KanbanProvider'
import {
  BoardModelType,
  CardModelType,
  ColumnModelType
} from '@/types/card.type'
import { Id } from '@/types/other.type'
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { arrayMove } from '@dnd-kit/sortable'

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

type BoardProps = {
  data: BoardModelType
  disabled?: boolean
  // onMove?: (active: Active, over: Over) => void
  onMove?: (data: DataOnMoveType) => void
}

const Board = ({ data: board, onMove }: BoardProps) => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const sensors = useSensors(pointerSensor)

  const [data, setData] = useState<BoardModelType>(board)

  // Active
  const activeItemRef = useRef<Id | null>(null)
  const activeNewIndex = useRef<number | null>(null)
  const activeNewColumn = useRef<Id | null>(null)

  const activeDragTypeRef = useRef<null | 'card'>(null)

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  // const prevColumnsRef = useRef(data.columns)

  // useEffect(() => {
  //   for (const [columnId, column] of Object.entries(data.columns)) {
  //     const prev = prevColumnsRef.current[columnId]?.cardIds || []
  //     const curr = column.cardIds

  //     const hasChanged =
  //       prev.length !== curr.length || prev.some((id, idx) => id !== curr[idx])

  //     // if (hasChanged) {
  //     //   console.log(`Column ${columnId} changed`, curr)
  //     //   // Do something with the update
  //     // }
  //   }

  //   prevColumnsRef.current = data.columns
  // }, [data.columns])

  const activeItemData = useMemo(() => {
    if (!activeItemRef.current) return undefined
    return data.cards.find((card) => card.id === activeItemRef.current)
  }, [data])

  // Tìm column đang chứa item đó
  const findColumn = useCallback(
    (overId: string) => {
      if (overId in data.columns) {
        return overId
      }
      for (const [key, value] of Object.entries(data.columns)) {
        if (value.cardIds.some((cardId) => overId === cardId)) return key
      }
      return null
    },
    [data]
  )

  // Khởi tạo khi bắt đầu kéo
  const handleDragStart = useCallback((event: DragStartEvent) => {
    console.log('event drag start', event)
    // Xác đinh card id đang được kéo
    const activeDragId = event.active.id
    console.log('drag start', activeDragId)
    activeItemRef.current = activeDragId as string
    activeDragTypeRef.current = 'card'
  }, [])

  // Thực hiện trong quá trình kéo
  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      if (!over) return

      const activeColumn = findColumn(active.id as string)
      const overColumn = findColumn(over.id as string)

      if (!activeColumn || !overColumn) return
      activeNewColumn.current = overColumn

      if (activeColumn == overColumn) {
        console.log('drag over: same column')
        const items = data.columns[activeColumn]
        if (!items) return

        const activeIndex = items.cardIds.findIndex(
          (item) => item === active.id
        )
        const overIndex = items.cardIds.findIndex((item) => item === over.id)

        if (activeIndex !== overIndex) {
          const newColumns = { ...data.columns }
          newColumns[activeColumn] = {
            name: newColumns[activeColumn].name,
            cardIds: arrayMove(items.cardIds, activeIndex, overIndex)
          }
          setData((prev) => {
            return {
              columns: newColumns,
              cards: prev.cards
            }
          })
        }
      } else {
        console.log('drag over different column')

        const activeItems = data.columns[activeColumn]
        const overItems = data.columns[overColumn]

        if (!activeItems || !overItems) return

        const activeIndex = activeItems.cardIds.findIndex(
          (item) => item === active.id
        )

        const overCardIndex = overItems.cardIds.findIndex(
          (id) => id === over.id
        )

        if (activeIndex === -1) return

        const activeItem = activeItems.cardIds[activeIndex]
        if (!activeItem) return

        console.log('drag over, different column')

        // Tính toán index của active card sẽ được đặt bên over column
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        const newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overItems.cardIds.length + 1

        overItems.cardIds.splice(newCardIndex, 0, activeItem)
        const updatedItems: BoardModelType = {
          columns: {
            ...data.columns,
            [activeColumn]: {
              name: activeItems.name,
              cardIds: activeItems.cardIds.filter((item) => item !== active.id)
            },
            [overColumn]: {
              name: overItems.name,
              cardIds: overItems.cardIds
            }
          },
          cards: data.cards
        }
        setData(updatedItems)
      }
    },
    [data, findColumn]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      console.info('Drag end', 'active', active)
      console.info('Drag end', 'over', over)
      if (!active || !over) return

      // Drag between 2 column, over is empty
      if (active.id in data.columns || over.id in data.columns) {
        const activeIndex = Object.keys(data.columns).indexOf(
          active.id as string
        )
        const overIndex = Object.keys(data.columns).indexOf(over.id as string)

        // Drag card between 2 column
        if (activeIndex !== overIndex) {
          console.log('Drag card between 2 column')
          const orderedColumns = Object.keys(data.columns)
          // const newOrder = arrayMove(orderedColumns, activeIndex, overIndex)
          const newColumns: Record<Id, ColumnModelType> = {}
          for (const key of orderedColumns) {
            const items = data.columns[key]
            if (items) {
              newColumns[key] = items
            }
          }

          setData((prev) => {
            return {
              columns: newColumns,
              cards: prev.cards
            }
          })
        }
      } else {
        const activeColumn = findColumn(active.id as string)
        const overColumn = findColumn(over.id as string)
        if (!activeColumn || !overColumn) {
          clearState()
          return
        }

        // Drag card in same column
        if (activeColumn == overColumn) {
          console.log('Drag card in same column')
          const items = data.columns[activeColumn]
          if (!items) {
            clearState()
            return
          }

          const activeIndex = items.cardIds.findIndex(
            (item) => item === active.id
          )
          const overIndex = items.cardIds.findIndex((item) => item === over.id)

          activeNewIndex.current = overIndex
          if (activeIndex !== overIndex) {
            const newColumns = { ...data.columns }
            newColumns[activeColumn].cardIds = arrayMove(
              items.cardIds,
              activeIndex,
              overIndex
            )
            setData((prev) => {
              return {
                columns: newColumns,
                cards: prev.cards
              }
            })
          }
        }
      }

      if (activeItemRef.current) {
        onMove?.({
          active: activeItemRef.current,
          columnTo: activeNewColumn.current,
          indexTo: activeNewIndex.current
        })
      }
      clearState()
    },
    [findColumn, data, onMove, activeNewIndex]
  )

  const handleDragCancel = useCallback(() => {
    clearState()
  }, [])

  const clearState = () => {
    activeItemRef.current = null
    activeDragTypeRef.current = null
    activeNewIndex.current = null
    activeNewColumn.current = null
  }

  useEffect(() => {
    setData(board)
  }, [board])

  return (
    <KanbanProvider
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className='flex bg-transparent'>
        {Object.entries(data.columns).map(([columnId, column]) => {
          const cardsInColumn = column.cardIds
            .map((cardId) => data.cards.find((card) => card?.id === cardId))
            .filter((card): card is CardModelType => !!card)

          return (
            <RenderColumns
              key={columnId}
              id={columnId}
              column={column}
              cards={cardsInColumn}
            />
          )
        })}
      </div>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeDragTypeRef.current === 'card' && activeItemData && (
          <KanbanCard
            data={{
              ...activeItemData
            }}
            container='bg-white shadow-md z-50 cursor-grabbing'
          />
        )}
      </DragOverlay>
    </KanbanProvider>
  )
}

export default memo(Board)
