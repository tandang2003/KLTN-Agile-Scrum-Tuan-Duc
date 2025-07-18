import { cn } from '@/lib/utils'
import { ComponentProps, ReactNode } from 'react'
type KanbanCardsProps = {
  children: ReactNode
  className?: string
} & ComponentProps<'div'>

const KanbanCards = ({ children, className, ...props }: KanbanCardsProps) => {
  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {children}
    </div>
  )
}

export default KanbanCards
