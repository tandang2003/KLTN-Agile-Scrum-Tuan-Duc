import { useAlertHost } from '@/components/AleartHost'
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
  setSprintActive
} from '@/feature/sprint/sprint.slice'
import { HttpStatusCode } from '@/lib/const'
import { toISODateString } from '@/lib/date.helper'
import { getStatusSprint } from '@/lib/sprint.helper'
import { cn, formatDate } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { SprintResponse } from '@/types/sprint.type'
import { toast } from 'sonner'
type SprintTemplateCardProps = {
  id: Id
  data: SprintResponse
  isDisabled?: boolean
}

const SprintTemplateCard = ({ data }: SprintTemplateCardProps) => {
  const [deleteSprint] = useDeleteSprintMutation()
  const dispatch = useAppDispatch()
  const { showAlert } = useAlertHost()

  const handleUpdate = () => {
    const { id, start, end } = data
    dispatch(
      setSprintActive({
        id: id,
        start: toISODateString(start),
        end: toISODateString(end)
      })
    )
    dispatch(openDialogUpdateSprint())
  }

  const handleDelete = () => {
    showAlert({
      title: 'Delete sprint',
      type: 'warning',
      message: `Are you sure you want to delete sprint "${data.title}"? This action cannot be undone.`,
      onConfirm: async () => {
        return deleteSprint(data.id)
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
    })
  }

  return (
    <div
      data-sprint-id={data.id}
      className={cn(
        'border-accent flex items-center gap-2 border-2 bg-gray-50 p-2 shadow-md'
      )}
    >
      <div className='flex flex-1 items-baseline'>
        <h3 className='text-md font-bold'>{data.title}</h3>
        <span className='ml-2 text-sm text-gray-500'>
          {formatDate(data.start, 'd MMM')} - {formatDate(data.end, 'd MMM')}
        </span>
        <span className='ml-auto flex items-center gap-4'>
          <span>Point: </span>
          <Badge className='bg-green-500'>{data.storyPoint}</Badge>
          <Badge statusSprint={getStatusSprint(data)} className='ml-auto'>
            {getStatusSprint(data)}
          </Badge>
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
