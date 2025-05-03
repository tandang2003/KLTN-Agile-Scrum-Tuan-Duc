import { board } from '@/assets/card.data'
import Card from '@/components/board/Card'
import Column from '@/components/board/Column'
import { BaseCardProps, BoardProps, ColumnProps } from '@/components/board/type'
import ClickOutsideProvider from '@/context/click/ClickOutsideProvider'
import { BoardModelType, CardModelType, ColumnsName } from '@/types/card.type'
import { Id } from '@/types/other.type'
import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'

import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { memo, useCallback, useEffect, useState } from 'react'

type BoardType = {}

const Board = ({}: BoardType) => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const sensors = useSensors(pointerSensor)

  const [data, setData] = useState<BoardModelType>(board)
  const [activeDragType, setActiveDragType] = useState<
    null | 'card' | 'column'
  >(null)

  const [activeItem, setActiveItem] = useState<Id | null>(null)
  const [activeItemData, setActiveDragItemData] =
    useState<CardModelType | null>(null)

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  // Tìm column đang chứa item đó
  const findColumnByOverId = useCallback(
    (overId: string) => {
      return Object.values(data.columns).find((columns) =>
        columns.cardIds.includes(overId)
      )
    },
    [data]
  )

  // Khởi tạo khi bắt đầu kéo
  const handleDragStart = (event: DragStartEvent) => {
    console.log('event drag start', event)
    // Xác đinh card id đang được kéo
    const activeDragCardId = event.active.id
    setActiveItem(activeDragCardId)
    setActiveDragType('card')
    setActiveDragItemData(event.active.data.current as CardModelType)
  }

  // Thực hiện trong quá trình kéo
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    console.info('active', active)
    console.info('drag over', 'over', over)
    // if (!active || !over) return

    // // activeDraggingCardId: Id card đang kéo
    // const {
    //   id: activeDraggingCardId,
    //   data: { current: activeDraggingCardData } = {} as {
    //     current: BaseCardProps
    //   }
    // } = active

    // /*  overCardId: cardId bị tác động
    //     Nếu kéo card sang 1 column không có card (empty items)
    //     thì overCardId sẽ lấy id của column đó
    // */
    // const { id: overCardId } = over as { id: string }

    // // Tìm column chứa card id đang kéo
    // const activeColumn = findColumnByCardId(activeDraggingCardId as string)

    // // Tìm column chứa card bị over (muốn kéo card qua)
    // /* Nếu kéo card sang 1 column không có card (empty items) thì
    // findColumnByCardId(overCardId) => undefined => Tìm col dựa theo column id (overCardId sẽ là )
    // */
    // const overColumn =
    //   findColumnByCardId(overCardId) ?? findColumnById(overCardId)
    // // console.info('activeColumn', activeColumn)
    // // console.info('overColumn', overColumn)            console.log(item)

    // // Xử lý drag card đi qua 2 column khác nhau
    // if (activeColumn.id !== overColumn.id) {
    //   console.info('Drag over', 'Kéo thả card trên 2 cột khác nhau')
    //   setColumns((prevColumns) => {
    //     // Tìm index của over card (over column không trống items)
    //     const overCardIndex = overColumn.items.findIndex(
    //       (card) => card.id === overCardId
    //     )

    //     // Tính toán index của active card sẽ được đặt bên over column
    //     const isBelowOverItem =
    //       active.rect.current.translated &&
    //       active.rect.current.translated.top > over.rect.top + over.rect.height
    //     const modifier = isBelowOverItem ? 1 : 0
    //     const newCardIndex =
    //       overCardIndex >= 0
    //         ? overCardIndex + modifier
    //         : overColumn.items.length + 1

    //     // console.info('overColumn', overColumn)
    //     // console.info('modifier', modifier)
    //     // console.info('overCardIndex', overCardIndex)
    //     // console.info('Vị trí của card mới', newCardIndex)

    //     // Deep copy column
    //     const nextColumn = cloneDeep(prevColumns)

    //     // Tìm active column (column có card id đang kéo) từ deep column trên
    //     const nextActiveColumn = nextColumn.find(
    //       (col) => col.id === activeColumn.id
    //     )

    //     // Tìm over column (column mong muốn kéo card sang) từ deep column trên
    //     const nextOverColumn = nextColumn.find(
    //       (col) => col.id === overColumn.id
    //     )

    //     if (nextActiveColumn) {
    //       // Xóa card đang kéo ở column active
    //       nextActiveColumn.items = nextActiveColumn.items.filter(
    //         (card) => card.id !== activeDragItemId
    //       )
    //     }
    //     if (nextOverColumn) {
    //       // Kiểm tra card đang kéo có tồn tại ở over col chưa?, nếu có thì phải xóa nó đi
    //       nextOverColumn.items = nextOverColumn.items.filter(
    //         (card) => card.id !== activeDragItemId
    //       )

    //       // Thêm card đang kéo vào over column theo index mới
    //       nextOverColumn.items = [
    //         ...nextOverColumn.items.slice(0, newCardIndex),
    //         activeDraggingCardData as BaseCardProps,
    //         ...nextOverColumn.items.slice(newCardIndex)
    //       ]
    //     }
    //     return nextColumn
    //   })
    // }
  }

  // Kết thúc quá trình kéo
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.info('Drag end', 'active', active)
    console.info('Drag end', 'over', over)

    // Xác định sự dụng độ giữa các col và các card lẫn nhau
    if (!active || !over) return
    if (activeDragType === 'column') return
    const activeId = active.id as string
    const overId = over.id as string
    const columnActive = findColumnByOverId(activeId)
    const columnOver = findColumnByOverId(overId)

    if (!columnActive || !columnOver) return
    // active and over same column
    console.log(columnActive, columnOver)
    if (columnActive.key === columnOver.key) {
      console.log('Same column')
      setData((prev) => {
        const key = columnActive.key

        const name = columnActive.name
        const oldIndex = columnActive.cardIds.findIndex(
          (value) => value == active.id
        )
        const newIndex = columnActive.cardIds.findIndex(
          (value) => value == over.id
        )
        console.log(arrayMove(columnActive.cardIds, oldIndex, newIndex))
        return {
          columns: {
            ...prev.columns,
            [key]: {
              key: key,
              name: name,
              cardIds: arrayMove(columnActive.cardIds, oldIndex, newIndex)
            }
          },
          cards: prev.cards
        }
      })
    }

    // active and over different column
    // Column is not empty: Column contain overId (overId is a card)
    if (columnActive.key !== columnOver.key) {
      console.log('different column')
      if (columnOver.cardIds.length !== 0) {
        console.log('Keo column ko rong')
        console.log(columnOver)

        const activeCardIndex = columnActive.cardIds.findIndex(
          (id) => id === activeId
        )
        const overCardIndex = columnOver.cardIds.findIndex(
          (id) => id === overId
        )
        // Tính toán index của active card sẽ được đặt bên over column
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        const newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : columnOver.cardIds.length + 1

        // console.info('overColumn', overColumn)
        // console.info('modifier', modifier)
        // console.info('overCardIndex', overCardIndex)
        // console.info('Vị trí của card mới', newCardIndex)

        setData((prev) => {
          const keyOver = columnOver.key
          const nameOver = prev.columns[keyOver].name
          const cardOverIds = prev.columns[keyOver].cardIds
          cardOverIds.splice(newCardIndex, 0, activeItem as Id)
          const keyActive = columnActive.key
          const nameActive = prev.columns[keyActive].name
          const cardActiveIds = prev.columns[keyActive].cardIds
          cardActiveIds.splice(activeCardIndex, 1)
          return {
            columns: {
              ...prev.columns,
              [keyActive]: {
                key: keyActive,
                name: nameActive,
                cardIds: cardActiveIds
              },
              [keyOver]: {
                key: keyOver,
                name: nameOver,
                cardIds: cardOverIds
              }
            },
            cards: prev.cards
          }
        })
      }
      // Column is empty
      else {
        const columnOverId = overId
        console.log('Keo column rong')
        console.log('overColumnId', columnOverId)
        setData((prev) => {
          const key = columnOver.key
          const name = prev.columns[key].name

          return {
            columns: {
              ...prev.columns,
              [columnOverId]: {
                key: key,
                name: name,
                cardIds: [activeItem]
              }
            },
            cards: prev.cards
          }
        })
      }
    }
    // Xử lý kéo thả card
    // const { id: activeId } = active
    // console.log

    // if (activeDragItemType === ACTIVE_ITEM.CARD) {

    //   /*  overCardId: cardId bị tác động
    //     Nếu kéo card sang 1 column không có card (empty items)
    //     thì overCardId sẽ lấy id của activeDraggingCardId
    //   */
    //   const { id: overCardId } = over as { id: string }

    //   // Tìm column chứa card id đang kéo
    //   const activeColumn = findColumnByCardId(activeDraggingCardId as string)

    //   // Tìm column chứa card bị over (muốn kéo card qua)
    //   const overColumn = findColumnByCardId(overCardId)
    //   // console.info('active col', activeColumn)
    //   // console.info('over col', overColumn)
    //   // console.info('oldColumnWhenDraggingCard', oldColumnWhenDraggingCard)

    //   if (!activeColumn || !overColumn) return

    //   if (oldColumnWhenDraggingCard?.id !== overColumn?.id) {
    //     /* Sử dụng oldColumnWhenDraggingCard để xác định column bắt đầu kéo (set tại drag start)
    //         Không sử dụng active Col (đã đươc set lại tại drag over)
    //       */
    //     // Kéo thả card giữa 2 col khác nhau
    //     // console.info('Drag end', 'Drag between 2 col diff')
    //     setColumns((prevColumns) => {
    //       // Tìm index của over card (over column không trống items)
    //       const overCardIndex = overColumn.items.findIndex(
    //         (card) => card.id === overCardId
    //       )

    //       // Tính toán index của active card sẽ được đặt bên over column
    //       const isBelowOverItem =
    //         active.rect.current.translated &&
    //         active.rect.current.translated.top >
    //           over.rect.top + over.rect.height
    //       const modifier = isBelowOverItem ? 1 : 0
    //       const newCardIndex =
    //         overCardIndex >= 0
    //           ? overCardIndex + modifier
    //           : overColumn.items.length + 1

    //       // console.info('overColumn', overColumn)
    //       // console.info('modifier', modifier)
    //       // console.info('overCardIndex', overCardIndex)
    //       // console.info('Vị trí của card mới', newCardIndex)

    //       // Deep copy column
    //       const nextColumn = cloneDeep(prevColumns)

    //       // Tìm active column (column có card id đang kéo) từ deep column trên
    //       const nextActiveColumn = nextColumn.find(
    //         (col) => col.id === activeColumn.id
    //       )

    //       // Tìm over column (column mong muốn kéo card sang) từ deep column trên
    //       const nextOverColumn = nextColumn.find(
    //         (col) => col.id === overColumn.id
    //       )

    //       if (nextActiveColumn) {
    //         // Xóa card đang kéo ở column active
    //         nextActiveColumn.items = nextActiveColumn.items.filter(
    //           (card) => card.id !== activeDragItemId
    //         )
    //       }
    //       if (nextOverColumn) {
    //         // Kiểm tra card đang kéo có tồn tại ở over col chưa?, nếu có thì phải xóa nó đi
    //         nextOverColumn.items = nextOverColumn.items.filter(
    //           (card) => card.id !== activeDragItemId
    //         )

    //         // Phải cập nhập lại chuẩn dữ liệu columnId khi dragEnd
    //         const rebuildActiveDraggingItemData = {
    //           ...activeDragItemData,
    //           columnId: nextOverColumn.id
    //         }

    //         // Thêm card đang kéo vào over column theo index mới
    //         nextOverColumn.items = [
    //           ...nextOverColumn.items.slice(0, newCardIndex),
    //           rebuildActiveDraggingItemData as BaseCardProps,
    //           ...nextOverColumn.items.slice(newCardIndex)
    //         ]
    //       }
    //       return nextColumn
    //     })
    //   } else {
    //     // Kéo thả card trong cùng 1 column
    //     // Lấy ra vị trí cũ của active drag item card trong column active (từ oldColumnWhenDraggingCard)
    //     const oldCardIndex =
    //       oldColumnWhenDraggingCard?.items.findIndex(
    //         (c) => c.id === activeDragItemId
    //       ) ?? 0

    //     // Lấy ra vị trí cũ của active drag item card trong column over
    //     const newCardIndex =
    //       overColumn?.items.findIndex((c) => c.id === overCardId) ?? 0

    //     // Di chuyển card bên trong oldColumnWhenDraggingCard
    //     const dndOrderCards = arrayMove(
    //       oldColumnWhenDraggingCard?.items ?? [],
    //       oldCardIndex,
    //       newCardIndex
    //     )

    //     setColumns((prevCols) => {
    //       const nextCols = cloneDeep(prevCols)

    //       // Tìm column muốn thả card vào
    //       const targetCol = nextCols.find((c) => c.id === overColumn?.id)

    //       // Cập nhập thứ tự bên trong card múôn thả
    //       if (targetCol?.items) {
    //         targetCol.items = dndOrderCards
    //         targetCol.itemsOrder = dndOrderCards.map((item) => item.id)
    //       }
    //       return nextCols
    //     })
    //   }
    // }

    setActiveItem(null)
    setActiveDragItemData(null)
    setActiveDragType(null)
  }
  useEffect(() => {
    console.log(data.columns)
  }, [data])
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ClickOutsideProvider>
        <div className='flex gap-3 bg-white'>
          {Object.entries(data.columns).map(([keyColumn, valueColumn]) => (
            <SortableContext key={keyColumn} items={valueColumn.cardIds ?? []}>
              <div className='w-[350px]'>
                <Column
                  id={keyColumn}
                  name={valueColumn.name}
                  items={valueColumn.cardIds
                    .map((cardId) =>
                      data.cards.find((card) => card.id === cardId)
                    )
                    .filter((item) => item !== undefined)}
                  itemsOrder={valueColumn.cardIds}
                  container='py-2 bg-column rounded-sm'
                  key={keyColumn}
                />
              </div>
            </SortableContext>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {activeDragType === 'card' && activeItem && activeItemData && (
              <Card
                data={{
                  ...activeItemData,
                  columnId: '1'
                }}
              />
            )}
          </DragOverlay>
        </div>
      </ClickOutsideProvider>
    </DndContext>
  )
}

export default memo(Board)
