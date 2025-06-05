import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAppDispatch } from '@/context/redux/hook'
import { useDeleteSprintMutation } from '@/feature/sprint/sprint.api'
import {
  openDialogUpdateSprint,
  setCurrentSprint
} from '@/feature/sprint/sprint.slice'
import { HttpStatusCode } from '@/lib/const'
import { cn, formatDate } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { SprintResponse } from '@/types/sprint.type'
import { toast } from 'sonner'
type SprintTemplateCardProps = {
  id: Id
  data: SprintResponse
  isDisabled?: boolean
}

const SprintTemplateCard = ({
  id,
  data,
  isDisabled = false
}: SprintTemplateCardProps) => {
  const [deleteSprint] = useDeleteSprintMutation()
  const dispatch = useAppDispatch()

  const handleUpdate = () => {
    const { id, start, end } = data
    dispatch(
      setCurrentSprint({
        id: id,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString()
      })
    )
    dispatch(openDialogUpdateSprint())
  }

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
      className={cn('flex items-center gap-2 bg-gray-50 p-2 shadow-md')}
    >
      <div className='flex flex-1 items-baseline'>
        <h3 className='text-md font-bold'>{data.title}</h3>
        <span className='ml-2 text-sm text-gray-500'>
          {formatDate(data.start, 'd MMM')} - {formatDate(data.end, 'd MMM')}
        </span>
        <span className='ml-auto flex items-center gap-4'>
          <span>Point: </span>
          <Badge className='bg-green-500'>{data.storyPoint}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Icon icon={'ri:more-fill'} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={handleUpdate}>Edit</DropdownMenuItem>
              <DropdownMenuItem
                className='bg-red-500 text-white hover:cursor-pointer hover:opacity-80'
                onClick={handleDelete}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
    </div>
  )
}
export default SprintTemplateCard
