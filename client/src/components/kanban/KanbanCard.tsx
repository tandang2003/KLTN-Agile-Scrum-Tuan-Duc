import { cn } from '@/lib/utils'
import { CardModelType } from '@/types/card.type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as CardUI
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
        'transition-color relative hover:cursor-pointer hover:!bg-gray-100',
        container
      )}
    >
      {!disabled && (
        <Button
          variant='ghost'
          className='absolute top-2 right-2 z-10 rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none'
          {...listeners}
          {...attributes}
        >
          <Icon icon={'material-symbols:drag-handle-outline'} size={20} />
        </Button>
      )}
      <CardUI
        className='rounded-none border-none bg-transparent p-0 shadow-none'
        onClick={() => onClick?.()}
      >
        <CardHeader className='p-0'>
          <CardTitle className='line-clamp-2 overflow-hidden text-lg leading-[1.67] text-wrap text-ellipsis'>
            {name}
          </CardTitle>
        </CardHeader>
        <CardDescription className='py-2'></CardDescription>
        <CardFooter className='p-0'>
          <span className='flex items-center gap-1'>
            <Icon icon={'material-symbols:chat-outline'} size={20} />
            <span>{numComment ?? 0}</span>
          </span>
          <span className='ml-2.5 flex items-center gap-1'>
            <Icon icon={'akar-icons:attach'} size={20} />
            <div>{numAttach ?? 0}</div>
          </span>
        </CardFooter>
      </CardUI>
    </div>
  )
}

export default memo(KanbanCard)
