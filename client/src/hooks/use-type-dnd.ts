import {
  Active,
  CancelDrop,
  Collision,
  CollisionDetection,
  DndContext as OriginalDndContext,
  DndContextProps,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  DroppableContainer,
  Over,
  useDndMonitor as baseUseDndMonitor,
  useDraggable as baseUseDraggable,
  UseDraggableArguments,
  useDroppable as baseUseDroppable,
  UseDroppableArguments
} from '@dnd-kit/core'

export const useTypedDnd = <DragData, DropData>() => {
  type TypesafeActive = Omit<Active, 'data'> & {
    data: React.MutableRefObject<DragData | undefined>
  }
  type TypesafeOver = Omit<Over, 'data'> & {
    data: React.MutableRefObject<DropData | undefined>
  }

  type ContextProps = Omit<
    DndContextProps,
    | 'onDragStart'
    | 'onDragMove'
    | 'onDragOver'
    | 'onDragEnd'
    | 'onDragCancel'
    | 'cancelDrop'
    | 'collisionDetection'
  > & {
    onDragStart?: (
      e: Omit<DragStartEvent, 'active'> & {
        active: TypesafeActive
      }
    ) => void
    onDragMove?: (
      e: Omit<DragMoveEvent, 'active' | 'over'> & {
        active: TypesafeActive
        over: TypesafeOver | null
      }
    ) => void
    onDragOver?: (
      e: Omit<DragOverEvent, 'active' | 'over'> & {
        active: TypesafeActive
        over: TypesafeOver | null
      }
    ) => void
    onDragEnd?: (
      e: Omit<DragEndEvent, 'active' | 'over'> & {
        active: TypesafeActive
        over: TypesafeOver | null
      }
    ) => void
    onDragCancel?: (
      e: Omit<DragCancelEvent, 'active' | 'over'> & {
        active: TypesafeActive
        over: TypesafeOver | null
      }
    ) => void
    cancelDrop?: (
      e: Omit<Parameters<CancelDrop>[0], 'active' | 'over'> & {
        active: TypesafeActive
        over: TypesafeOver | null
      }
    ) => ReturnType<CancelDrop>
    collisionDetection?: (
      e: Omit<
        Parameters<CollisionDetection>[0],
        'active' | 'droppableContainers'
      > & {
        active: TypesafeActive
        droppableContainers: Array<
          Omit<DroppableContainer, 'data'> & TypesafeOver
        >
      }
    ) => Array<Omit<Collision, 'data'> & TypesafeOver>
  }

  const DndContext: React.NamedExoticComponent<ContextProps> =
    OriginalDndContext as any

  const useDndMonitor: (
    args: Pick<
      ContextProps,
      'onDragStart' | 'onDragMove' | 'onDragOver' | 'onDragEnd' | 'onDragCancel'
    >
  ) => void = baseUseDndMonitor as any

  const useDraggable: (
    args: Omit<UseDraggableArguments, 'data'> & { data: DragData }
  ) => Omit<ReturnType<typeof baseUseDraggable>, 'active' | 'over'> & {
    active: TypesafeActive | null
    over: TypesafeOver | null
  } = baseUseDraggable as any

  const useDroppable: (
    args: Omit<UseDroppableArguments, 'data'> & { data: DropData }
  ) => Omit<ReturnType<typeof baseUseDroppable>, 'active' | 'over'> & {
    active: TypesafeActive | null
    over: TypesafeOver | null
  } = baseUseDroppable as any

  return { DndContext, useDndMonitor, useDraggable, useDroppable }
}
