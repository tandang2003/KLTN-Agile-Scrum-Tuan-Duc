import { useAlertHost } from '@/components/AleartHost'
import Icon from '@/components/Icon'
import Message from '@/components/Message'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import messages from '@/constant/message.const'
import {
  useDeleteIssueMutation,
  useMoveIssueToBacklogMutation
} from '@/feature/issue/issue.api'
import useOpenIssueUpdate from '@/hooks/use-issue-update'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { IssueResponse } from '@/types/issue.type'
import { toast } from 'sonner'

type SprintCardInSprintProps = {
  item: IssueResponse
  index: number
}

const SprintCardInSprint = ({ index, item }: SprintCardInSprintProps) => {
  const message = messages.component.sprint.sprintCardInSprint
  const { start, end, sprintId, id } = item
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const { action } = useOpenIssueUpdate()
  const [moveToBacklog] = useMoveIssueToBacklogMutation()
  const [deleteIssue] = useDeleteIssueMutation()
  const { showAlert } = useAlertHost()

  const handleMoveToBacklog = () => {
    moveToBacklog({
      id: id,
      sprintId: sprintId
    })
      .unwrap()
      .then(() => {
        toast.success(message.toast.moveToBacklog.success.message, {
          description: (
            <Message
              template={message.toast.moveToBacklog.success.description}
              values={{
                name: item.name
              }}
            />
          )
        })
      })
      .catch((err) => {
        toast.error(message.toast.moveToBacklog.failed, {
          description: err.data?.message || 'An error occurred.'
        })
      })
  }

  const handleDelete = () => {
    showAlert({
      title: message.alert.delete.title,
      type: 'warning',
      message: (
        <Message
          template={message.alert.delete.message}
          values={{
            name: item.name
          }}
        />
      ),
      onConfirm: () => {
        return deleteIssue(id)
          .unwrap()
          .then(() => {
            toast.success(message.toast.delete.success)
          })
          .catch(() => {
            toast.error(message.toast.delete.failed)
          })
      }
    })
  }

  const canMoveToBacklog =
    start &&
    end &&
    getStatusSprint({
      id: sprintId,
      start: start,
      end: end
    }) === 'PENDING'

  return (
    <div className='flex rounded-sm border-2 bg-white px-4 py-2' key={item.id}>
      <ToolTip
        trigger={
          <div className='font-semibold'>
            Issue {index + 1}: <span>{item.name}</span>
          </div>
        }
      >
        {item.id}
      </ToolTip>
      <div className='ml-auto'>
        <Badge status={item.status}>{item.status}</Badge>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon icon={'ri:more-fill'} className='ml-3' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <RequiredAuth roles={['student']}>
            <DropdownMenuItem
              onClick={() => {
                action(item.id)
              }}
            >
              {message.dropdown.edit}
            </DropdownMenuItem>
          </RequiredAuth>
          {canMoveToBacklog && (
            <>
              <DropdownMenuItem onClick={handleMoveToBacklog}>
                {message.dropdown.moveToBacklog}
              </DropdownMenuItem>
              <DropdownMenuItem className='cancel' onClick={handleDelete}>
                {message.dropdown.delete}
              </DropdownMenuItem>
            </>
          )}
          {item.status === 'DONE' && (
            <DropdownMenuItem onClick={handleMoveToBacklog}>
              Reopen
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SprintCardInSprint
