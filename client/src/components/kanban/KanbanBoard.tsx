import { cn } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { useDroppable } from '@dnd-kit/core'
import { ReactNode } from 'react'
type KanbanBoardProps = {
  id: Id
  children: ReactNode
  className?: string
}

const KanbanBoard = ({ id, children, className }: KanbanBoardProps) => {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      className={cn(cn('min-h-[100px] rounded-sm px-2'), className)}
      ref={setNodeRef}
    >
      {children}
    </div>
  )
}

export default KanbanBoard
