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
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div className={cn(className)} ref={setNodeRef}>
      {children}
    </div>
  )
}

export default KanbanBoard
