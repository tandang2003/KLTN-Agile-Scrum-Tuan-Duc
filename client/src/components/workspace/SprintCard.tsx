import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useDeleteSprintMutation } from '@/feature/sprint/sprint.api'
import { HttpStatusCode } from '@/lib/const'
import { cn, formatDate } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { SprintResponse } from '@/types/sprint.type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'sonner'
type SprintCardProps = {
  id: Id
  data: SprintResponse
  isDisabled?: boolean
}

const SprintCard = ({ id, data, isDisabled = false }: SprintCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data: data
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    padding: '0.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    opacity: isDragging ? 0.7 : undefined,
    border: isDragging ? '1px solid red' : undefined
  }

  const [deleteSprint] = useDeleteSprintMutation()

  const handleDelete = () => {
    deleteSprint(data.id)
      .unwrap()
      .then(() => {
        toast.success('Sprint deleted successfully')
      })
      .catch((error) => {
        if (error.status === HttpStatusCode.Conflict) {
          toast.error('Sprint is ended, cannot delete')
        }
      })
  }

  return (
    <div
      data-sprint-id={data.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn('flex items-center gap-2 bg-gray-50')}
    >
      <Button
        className={cn(
          'bg-transparent p-0 hover:cursor-grab hover:bg-gray-400',
          isDragging ? 'cursor-grab' : undefined
        )}
        {...(!isDisabled ? listeners : {})}
      >
        {!isDisabled && (
          <Icon icon={'lsicon:drag-filled'} className='text-black' />
        )}
      </Button>
      <div className='flex flex-1 items-baseline'>
        <h3 className='text-md font-bold'>{data.title}</h3>
        <span className='ml-2 text-sm text-gray-500'>
          {formatDate(data.start, 'd MMM')} - {formatDate(data.end, 'd MMM')}
        </span>
        <span className='ml-auto flex items-center gap-4'>
          <span>min point: </span>
          <Badge className='bg-green-500'>{data.miniumStoryPoint}</Badge>
          {isDisabled && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Icon icon={'ri:more-fill'} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem
                  className='bg-red-500 text-white hover:cursor-pointer hover:opacity-80'
                  onClick={handleDelete}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </span>
      </div>
    </div>
  )
}
export default SprintCard
