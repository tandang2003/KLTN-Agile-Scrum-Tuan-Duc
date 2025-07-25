// import { createCtx } from '@/lib/context.helper'
// import { cn } from '@/lib/utils'
// import { Id } from '@/types/other.type'
// import {
//   closestCorners,
//   defaultDropAnimationSideEffects,
//   DndContext,
//   DndContextProps,
//   DragCancelEvent,
//   DragEndEvent,
//   DragOverEvent,
//   DragStartEvent,
//   DropAnimation,
//   PointerSensor,
//   UniqueIdentifier,
//   useSensor,
//   useSensors
// } from '@dnd-kit/core'
// import {
//   arrayMove,
//   SortableContextProps,
//   verticalListSortingStrategy
// } from '@dnd-kit/sortable'
// import { ComponentProps, ReactNode, useCallback, useMemo, useRef } from 'react'

// type KanbanProps<T> = {
//   items: Record<Id, T[]>
//   children: ReactNode
//   onValueChange?: (columns: Record<UniqueIdentifier, T[]>) => void
//   onDragEnd: (event: DragEndEvent) => void
//   onMove?: (
//     event: DragEndEvent & { activeIndex: number; overIndex: number }
//   ) => void
//   strategy?: SortableContextProps['strategy']
//   orientation?: 'horizontal' | 'vertical'
//   flatCursor?: boolean
//   className?: string
//   disabled?: boolean
//   getItemId: (item: T) => Id
// } & ComponentProps<typeof DndContext>

// type KanbanContextValue<T> = {
//   items: Record<Id, T[]>
//   modifiers: DndContextProps['modifiers']
//   strategy: SortableContextProps['strategy']
//   orientation: 'horizontal' | 'vertical'
//   activeId: UniqueIdentifier | null
//   setActiveId: (id: UniqueIdentifier | null) => void
//   getItemValue: (item: T) => UniqueIdentifier
//   flatCursor: boolean
// }

// const [useKanbanContext, KanbanContextProvider] =
//   createCtx<KanbanContextValue<unknown>>()

// const Kanban = <T,>({
//   children,
//   onDragEnd,
//   className,
//   disabled = false,
//   items: value,
//   onMove,
//   getItemId,
//   onValueChange,
//   modifiers,
//   strategy = verticalListSortingStrategy,
//   orientation = 'horizontal',
//   flatCursor = false,
//   ...props
// }: KanbanProps<T>) => {
//   const pointerSensor = useSensor(PointerSensor, {
//     activationConstraint: {
//       distance: 10
//     }
//   })
//   const sensors = useSensors(pointerSensor)

//   const activeItemRef = useRef<Id | null>(null)
//   const activeNewIndex = useRef<number | null>(null)
//   const activeNewColumn = useRef<UniqueIdentifier | null>(null)

//   const activeDragTypeRef = useRef<null | 'card'>(null)

//   const dropAnimation: DropAnimation = {
//     sideEffects: defaultDropAnimationSideEffects({
//       styles: { active: { opacity: '0.5' } }
//     })
//   }

//   const getItemValue = useCallback(
//     (item: T): UniqueIdentifier => {
//       if (typeof item === 'object' && !getItemId) {
//         throw new Error('getItemId is required when using array of objects')
//       }
//       return getItemId ? getItemId(item) : (item as UniqueIdentifier)
//     },
//     [getItemId]
//   )

//   const getColumn = useCallback(
//     (overId: UniqueIdentifier) => {
//       if (overId in value) {
//         return overId
//       }
//       for (const [columnId, items] of Object.entries(value)) {
//         if (items.some((item) => getItemValue(item) === overId)) return columnId
//       }
//       return null
//     },
//     [value, getItemValue]
//   )

//   const handleDragStart = useCallback((event: DragStartEvent) => {
//     console.log('event drag start', event)
//     // Xác đinh card id đang được kéo
//     const activeDragId = event.active.id
//     console.log('drag start', activeDragId)
//     activeItemRef.current = activeDragId as string
//     activeDragTypeRef.current = 'card'
//   }, [])

//   // Thực hiện trong quá trình kéo
//   const handleDragOver = useCallback(
//     (event: DragOverEvent) => {
//       const { active, over } = event
//       if (!over) return

//       const activeColumn = getColumn(active.id)
//       const overColumn = getColumn(over.id)

//       if (!activeColumn || !overColumn) return
//       activeNewColumn.current = overColumn

//       if (activeColumn == overColumn) {
//         console.log('drag over same column')
//         const items = value[activeColumn]
//         if (!items) return

//         const activeIndex = items.findIndex(
//           (item) => getItemValue(item) === active.id
//         )
//         const overIndex = items.findIndex(
//           (item) => getItemValue(item) === over.id
//         )

//         if (activeIndex !== overIndex) {
//           const newColumns = { ...value }
//           newColumns[activeColumn] = arrayMove(items, activeIndex, overIndex)

//           onValueChange?.(newColumns)
//         }
//       } else {
//         console.log('drag over different column')

//         const activeItems = value[activeColumn]
//         const overItems = value[overColumn]

//         if (!activeItems || !overItems) return

//         const activeIndex = activeItems.findIndex(
//           (item) => getItemValue(item) === active.id
//         )

//         if (activeIndex == -1) return

//         const activeItem = activeItems[activeIndex]
//         if (!activeItem) return

//         const updatedItems = {
//           ...value,
//           [activeColumn]: activeItems.filter(
//             (item) => getItemValue(item) !== active.id
//           ),
//           [overColumn]: [...overItems, activeItem]
//         }

//         onValueChange?.(updatedItems)
//       }
//     },
//     [value, getColumn, getItemValue, onValueChange, getColumn]
//   )

//   const handleDragEnd = useCallback(
//     (event: DragEndEvent) => {
//       const { active, over } = event
//       if (!over) {
//         activeItemRef.current = null
//         return
//       }
//       if (active.id in value && over.id in value) {
//         console.log('drag end column => pause')
//       } else {
//         const activeColumn = getColumn(active.id)
//         const overColumn = getColumn(over.id)
//         if (!activeColumn || !overColumn) {
//           activeItemRef.current = null
//           return
//         }

//         if (activeItemRef.current === overColumn) {
//           console.log('drag end card in 1 column')
//           const items = value[activeColumn]
//           if (!items) {
//             activeItemRef.current = null
//             return
//           }

//           const activeIndex = items.findIndex(
//             (item) => getItemValue(item) === active.id
//           )
//           const overIndex = items.findIndex(
//             (item) => getItemValue(item) === over.id
//           )

//           if (activeIndex !== overIndex) {
//             const newColumns = { ...value }
//             newColumns[activeColumn] = arrayMove(items, activeIndex, overIndex)
//             if (onMove) {
//               onMove({
//                 ...event,
//                 activeIndex,
//                 overIndex
//               })
//             } else {
//               onValueChange?.(newColumns)
//             }
//           }
//         }
//       }
//       activeItemRef.current = null
//     },
//     [value, getColumn, getItemValue, onValueChange, onMove]
//   )

//   const handleDragCancel = useCallback((event: DragCancelEvent) => {
//     activeItemRef.current = null
//   }, [])

//   const setActiveId = (id: Id) => {
//     activeItemRef.current = id
//   }

//   const contextValue = useMemo<KanbanContextValue<T>>(() => {
//     return {
//       items: value,
//       modifiers,
//       strategy,
//       orientation,
//       activeId: activeItemRef.current,
//       setActiveId: setActiveId,
//       getItemValue,
//       flatCursor
//     }
//   }, [
//     value,
//     modifiers,
//     strategy,
//     orientation,
//     activeItemRef.current,
//     setActiveId,
//     getItemValue,
//     flatCursor
//   ])

//   return (
//     <KanbanContextProvider value={contextValue as KanbanContextValue<unknown>}>
//       <DndContext
//         collisionDetection={closestCorners}
//         modifiers={modifiers}
//         sensors={sensors}
//         {...props}
//         onDragStart={handleDragStart}
//         onDragOver={handleDragOver}
//         onDragEnd={handleDragEnd}
//         onDragCancel={handleDragCancel}
//       >
//         <div
//           className={cn(
//             'grid w-full auto-cols-fr grid-flow-col gap-4',
//             className
//           )}
//         >
//           {children}
//         </div>
//       </DndContext>
//     </KanbanContextProvider>
//   )
// }

// export default Kanban
