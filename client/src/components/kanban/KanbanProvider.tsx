import { KanbanContext } from '@/components/kanban/useKanbanContext'
import { cn } from '@/lib/utils'
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { ComponentProps, ReactNode } from 'react'
type KanbanProviderProps = {
  children: ReactNode
  onDragEnd: (event: DragEndEvent) => void
  className?: string
  disabled?: boolean
} & ComponentProps<typeof DndContext>

const KanbanProvider = ({
  children,
  onDragEnd,
  className,
  disabled = false,
  ...props
}: KanbanProviderProps) => {
  return (
    <KanbanContext.Provider
      value={{
        onDragEnd,
        disabled
      }}
    >
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
        {...props}
      >
        <div
          className={cn(
            'grid w-full auto-cols-fr grid-flow-col gap-4',
            className
          )}
        >
          {children}
        </div>
      </DndContext>
    </KanbanContext.Provider>
  )
}

export default KanbanProvider
