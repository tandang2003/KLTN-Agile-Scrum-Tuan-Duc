import { cn } from '@/lib/utils'
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { ComponentProps, ReactNode } from 'react'
type KanbanProviderProps = {
  children: ReactNode
  onDragEnd: (event: DragEndEvent) => void
  className?: string
} & ComponentProps<typeof DndContext>

const KanbanProvider = ({
  children,
  onDragEnd,
  className,
  ...props
}: KanbanProviderProps) => {
  return (
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
  )
}

export default KanbanProvider
