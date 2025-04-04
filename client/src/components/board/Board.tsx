import Card from '@/components/board/Card'
import Column from '@/components/board/Column'
import { BaseCardProps, BoardProps, ColumnProps } from '@/components/board/type'
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
import { cloneDeep } from 'lodash'
import { useState } from 'react'

type ACTIVE_ITEM_TYPE = keyof typeof ACTIVE_ITEM

const ACTIVE_ITEM = {
  COLUMN: 'COLUMN',
  CARD: 'CARD'
} as const

const Board = ({ columns: model }: BoardProps) => {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })

  const sensors = useSensors(pointerSensor)

  const [columns, setColumns] = useState<ColumnProps[]>(model)

  // Đánh dấu Item đang được kéo (cùng 1 thời điểm chỉ có 1 Item được kéo)
  const [activeDragItemId, setActiveDragItemId] = useState<Id | null>(null)

  // Đánh dấu đang kéo Col hoặc đang kéo Card
  const [activeDragItemType, setActiveDragItemType] =
    useState<ACTIVE_ITEM_TYPE | null>(null)
  const [activeDragItemData, setActiveDragItemData] =
    useState<BaseCardProps | null>(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState<ColumnProps | null>(null)

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  // Tìm column đang chứa item đó
  const findColumnByCardId = (cardId: string) => {
    return columns.find((column) =>
      column.items.map((card) => card.id).includes(cardId)
    )
  }

  // Tìm column
  const findColumnById = (columnId: string) => {
    return columns.find((column) => column.id === columnId)
  }

  // Khởi tạo khi bắt đầu kéo
  const handleDragStart = (event: DragStartEvent) => {
    // console.log('event drag start', event)

    // Xác đinh card id đang được kéo
    const activeDragCardId = event.active.id
    setActiveDragItemId(activeDragCardId)

    // Xác định đang kéo column hoặc kéo card
    const activeDragType = !event.active.data.current?.columnId
      ? ACTIVE_ITEM.COLUMN
      : ACTIVE_ITEM.CARD
    setActiveDragItemType(() => activeDragType)

    // Lấy data của card đang được kéo
    setActiveDragItemData(() => {
      return event.active.data.current as BaseCardProps
    })

    // Lấy data cột hiện tại đang giữ card (gốc)
    if (event.active.data.current?.columnId) {
      setOldColumnWhenDraggingCard(
        findColumnByCardId(event.active.id as string) ?? null
      )
    }
  }

  // Thực hiện trong quá trình kéo
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    // console.info('active', active)
    // console.info('drag over', 'over', over)
    if (!active || !over) return

    // activeDraggingCardId: Id card đang kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData } = {} as {
        current: BaseCardProps
      }
    } = active

    /*  overCardId: cardId bị tác động 
        Nếu kéo card sang 1 column không có card (empty items)
        thì overCardId sẽ lấy id của column đó
    */
    const { id: overCardId } = over as { id: string }

    // Tìm column chứa card id đang kéo
    const activeColumn = findColumnByCardId(activeDraggingCardId as string)

    // Tìm column chứa card bị over (muốn kéo card qua)
    /* Nếu kéo card sang 1 column không có card (empty items) thì 
    findColumnByCardId(overCardId) => undefined => Tìm col dựa theo column id (overCardId sẽ là )
    */
    const overColumn =
      findColumnByCardId(overCardId) ?? findColumnById(overCardId)
    // console.info('activeColumn', activeColumn)
    // console.info('overColumn', overColumn)

    if (!activeColumn || !overColumn) return

    // Xử lý drag card đi qua 2 column khác nhau
    if (activeColumn.id !== overColumn.id) {
      console.info('Drag over', 'Kéo thả card trên 2 cột khác nhau')
      setColumns((prevColumns) => {
        // Tìm index của over card (over column không trống items)
        const overCardIndex = overColumn.items.findIndex(
          (card) => card.id === overCardId
        )

        // Tính toán index của active card sẽ được đặt bên over column
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        const newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn.items.length + 1

        // console.info('overColumn', overColumn)
        // console.info('modifier', modifier)
        // console.info('overCardIndex', overCardIndex)
        // console.info('Vị trí của card mới', newCardIndex)

        // Deep copy column
        const nextColumn = cloneDeep(prevColumns)

        // Tìm active column (column có card id đang kéo) từ deep column trên
        const nextActiveColumn = nextColumn.find(
          (col) => col.id === activeColumn.id
        )

        // Tìm over column (column mong muốn kéo card sang) từ deep column trên
        const nextOverColumn = nextColumn.find(
          (col) => col.id === overColumn.id
        )

        if (nextActiveColumn) {
          // Xóa card đang kéo ở column active
          nextActiveColumn.items = nextActiveColumn.items.filter(
            (card) => card.id !== activeDragItemId
          )
        }
        if (nextOverColumn) {
          // Kiểm tra card đang kéo có tồn tại ở over col chưa?, nếu có thì phải xóa nó đi
          nextOverColumn.items = nextOverColumn.items.filter(
            (card) => card.id !== activeDragItemId
          )

          // Thêm card đang kéo vào over column theo index mới
          nextOverColumn.items = [
            ...nextOverColumn.items.slice(0, newCardIndex),
            activeDraggingCardData as BaseCardProps,
            ...nextOverColumn.items.slice(newCardIndex)
          ]
        }
        return nextColumn
      })
    }
  }

  // Kết thúc quá trình kéo
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.info('Drag end', 'active', active)
    console.info('Drag end', 'over', over)

    // Xác định sự dụng độ giữa các col và các card lẫn nhau
    if (!active || !over) return

    // Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_ITEM.CARD) {
      // activeDraggingCardId: Id card đang kéo
      const { id: activeDraggingCardId } = active

      /*  overCardId: cardId bị tác động 
        Nếu kéo card sang 1 column không có card (empty items)
        thì overCardId sẽ lấy id của activeDraggingCardId
      */
      const { id: overCardId } = over as { id: string }

      // Tìm column chứa card id đang kéo
      const activeColumn = findColumnByCardId(activeDraggingCardId as string)

      // Tìm column chứa card bị over (muốn kéo card qua)
      const overColumn = findColumnByCardId(overCardId)
      // console.info('active col', activeColumn)
      // console.info('over col', overColumn)
      // console.info('oldColumnWhenDraggingCard', oldColumnWhenDraggingCard)

      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard?.id !== overColumn?.id) {
        /* Sử dụng oldColumnWhenDraggingCard để xác định column bắt đầu kéo (set tại drag start) 
            Không sử dụng active Col (đã đươc set lại tại drag over)
          */
        // Kéo thả card giữa 2 col khác nhau
        // console.info('Drag end', 'Drag between 2 col diff')
        setColumns((prevColumns) => {
          // Tìm index của over card (over column không trống items)
          const overCardIndex = overColumn.items.findIndex(
            (card) => card.id === overCardId
          )

          // Tính toán index của active card sẽ được đặt bên over column
          const isBelowOverItem =
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height
          const modifier = isBelowOverItem ? 1 : 0
          const newCardIndex =
            overCardIndex >= 0
              ? overCardIndex + modifier
              : overColumn.items.length + 1

          // console.info('overColumn', overColumn)
          // console.info('modifier', modifier)
          // console.info('overCardIndex', overCardIndex)
          // console.info('Vị trí của card mới', newCardIndex)

          // Deep copy column
          const nextColumn = cloneDeep(prevColumns)

          // Tìm active column (column có card id đang kéo) từ deep column trên
          const nextActiveColumn = nextColumn.find(
            (col) => col.id === activeColumn.id
          )

          // Tìm over column (column mong muốn kéo card sang) từ deep column trên
          const nextOverColumn = nextColumn.find(
            (col) => col.id === overColumn.id
          )

          if (nextActiveColumn) {
            // Xóa card đang kéo ở column active
            nextActiveColumn.items = nextActiveColumn.items.filter(
              (card) => card.id !== activeDragItemId
            )
          }
          if (nextOverColumn) {
            // Kiểm tra card đang kéo có tồn tại ở over col chưa?, nếu có thì phải xóa nó đi
            nextOverColumn.items = nextOverColumn.items.filter(
              (card) => card.id !== activeDragItemId
            )

            // Phải cập nhập lại chuẩn dữ liệu columnId khi dragEnd
            const rebuildActiveDraggingItemData = {
              ...activeDragItemData,
              columnId: nextOverColumn.id
            }

            // Thêm card đang kéo vào over column theo index mới
            nextOverColumn.items = [
              ...nextOverColumn.items.slice(0, newCardIndex),
              rebuildActiveDraggingItemData as BaseCardProps,
              ...nextOverColumn.items.slice(newCardIndex)
            ]
          }
          return nextColumn
        })
      } else {
        // Kéo thả card trong cùng 1 column
        // Lấy ra vị trí cũ của active drag item card trong column active (từ oldColumnWhenDraggingCard)
        const oldCardIndex =
          oldColumnWhenDraggingCard?.items.findIndex(
            (c) => c.id === activeDragItemId
          ) ?? 0

        // Lấy ra vị trí cũ của active drag item card trong column over
        const newCardIndex =
          overColumn?.items.findIndex((c) => c.id === overCardId) ?? 0

        // Di chuyển card bên trong oldColumnWhenDraggingCard
        const dndOrderCards = arrayMove(
          oldColumnWhenDraggingCard?.items ?? [],
          oldCardIndex,
          newCardIndex
        )

        setColumns((prevCols) => {
          const nextCols = cloneDeep(prevCols)

          // Tìm column muốn thả card vào
          const targetCol = nextCols.find((c) => c.id === overColumn?.id)

          // Cập nhập thứ tự bên trong card múôn thả
          if (targetCol?.items) {
            targetCol.items = dndOrderCards
            targetCol.itemsOrder = dndOrderCards.map((item) => item.id)
          }
          return nextCols
        })
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className='flex w-max gap-3'>
        {columns.map((col) => (
          <SortableContext
            key={col.id}
            items={col.items?.map((item) => item.id) ?? []}
          >
            <div className='w-[350px]'>
              <Column
                id={col.id}
                name={col.name}
                items={col.items}
                itemsOrder={col.items.map((item) => item.id)}
                container='px-3 py-2'
              />
            </div>
          </SortableContext>
        ))}
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_ITEM.CARD && activeDragItemData && (
            <Card {...activeDragItemData} />
          )}
        </DragOverlay>
      </div>
    </DndContext>
  )
}

export default Board
