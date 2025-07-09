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
import { HttpStatusCode } from '@/constant/app.const'
import { toISODateString } from '@/lib/date.helper'
import { cn, formatDate } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { SprintResponse } from '@/types/sprint.type'
import { toast } from 'sonner'
import messages, { getSprintStatusDisplayName } from '@/constant/message.const'
import Message from '@/components/Message'
import useSprintCurrent from '@/hooks/use-sprint-current'
type SprintTemplateCardProps = {
  id: Id
  data: SprintResponse
  isDisabled?: boolean
}

const SprintTemplateCard = ({ data }: SprintTemplateCardProps) => {
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const message = messages.component.sprint.template.card
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
      title: message.alert.title,
      type: 'warning',
      message: (
        <Message
          template={message.alert.message}
          values={{
            title: data.title
          }}
        />
      ),
      onConfirm: async () => {
        return deleteSprint(data.id)
          .unwrap()
          .then(() => {
            toast.success(message.toast.delete.success)
          })
          .catch((error) => {
            if (error.status === HttpStatusCode.Conflict) {
              toast.error(message.toast.delete.conflict)
            } else {
              toast.error(message.toast.delete.failed)
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
          <span>{message.point}: </span>
          <Badge className='bg-green-500'>{data.storyPoint}</Badge>
          <Badge
            statusSprint={getStatusSprint(data)}
            className='ml-auto w-[100px]'
          >
            {getSprintStatusDisplayName(getStatusSprint(data))}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Icon icon={'ri:more-fill'} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={handleUpdate}>
                {message.dropdown.edit}
              </DropdownMenuItem>
              <DropdownMenuItem
                className='bg-red-500 text-white hover:cursor-pointer hover:opacity-80'
                onClick={handleDelete}
              >
                {message.dropdown.delete}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
    </div>
  )
}
export default SprintTemplateCard
