import { cn } from '@/lib/utils'
import { CardModelType } from '@/types/card.type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CardHeader, CardTitle, Card as CardUI } from '@/components/ui/card'
import Icon from '@/components/Icon'
import { memo } from 'react'
import useKanbanContext from '@/components/kanban/useKanbanContext'
type KanbanCardProps = {
  data: CardModelType
  container?: string
  onClick?: () => void
}

const KanbanCard = ({
  data: { id, name, numAttach, numComment, numAssigner = 0 },
  container,
  onClick
}: KanbanCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data: {
      id,
      name,
      numAttach,
      numComment,
      numAssigner
    }
  })
  const { disabled } = useKanbanContext()
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    opacity: isDragging ? 0.7 : undefined,
    border: isDragging ? '1px solid red' : undefined
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        'transition-outline outline-0 drop-shadow-xs',
        'transition-color hover:cursor-pointer hover:!bg-gray-100',
        container
      )}
    >
      <CardUI
        className='flex items-start gap-4 rounded-none border-none bg-transparent p-0 shadow-none'
        onClick={() => !disabled && onClick?.()}
      >
        <CardHeader className='flex-1 p-0'>
          <CardTitle className='line-clamp-2 text-lg leading-[1.67] text-wrap text-ellipsis'>
            {name}
          </CardTitle>
        </CardHeader>
        <div className='basis-[30px]'>
          {!disabled && (
            <div
              className='p-1 hover:opacity-90'
              {...listeners}
              {...attributes}
            >
              <Icon icon={'mdi:drag'} size={30} className='text-black' />
            </div>
          )}
        </div>
      </CardUI>
    </div>
  )
}

export default memo(KanbanCard)
