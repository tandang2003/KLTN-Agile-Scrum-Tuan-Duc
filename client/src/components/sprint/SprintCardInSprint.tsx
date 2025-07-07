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
import { HttpStatusCode } from '@/constant/app.const'
import messages from '@/constant/message.const'
import {
  useDeleteIssueMutation,
  useMoveIssueToBacklogMutation,
  useReopenIssueMutation
} from '@/feature/issue/issue.api'
import useOpenIssueUpdate from '@/hooks/use-issue-update'
import useSprintCurrent from '@/hooks/use-sprint-current'
import boardService from '@/services/board.service'
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
  const [reopen] = useReopenIssueMutation()

  const handleMoveToBacklog = () => {
    moveToBacklog({
      id: id,
      sprintId: sprintId
    })
      .unwrap()
      .then(() => {
        boardService
          .removePosition({
            issueId: id,
            sprintId: sprintId,
            projectId: item.projectId,
            statusPrev: item.status
          })
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
      })
      .catch((err) => {
        toast.error(message.toast.moveToBacklog.failed, {
          description: err.data?.message || 'An error occurred.'
        })
      })
  }

  const handleReopen = () => {
    showAlert({
      title: message.alert.reopen.title,
      type: 'info',
      message: (
        <Message
          template={message.alert.reopen.message}
          values={{
            name: item.name
          }}
        />
      ),
      onConfirm: () => {
        return reopen(item.id)
          .unwrap()
          .then(() => {
            toast.message(message.toast.reopen.success)
          })
          .catch((err) => {
            if (err.status === HttpStatusCode.Conflict)
              toast.error(message.toast.reopen.conflict)
            else toast.error(message.toast.reopen.failed)
          })
      }
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

  const canEdit =
    start &&
    end &&
    getStatusSprint({
      id: sprintId,
      start: start,
      end: end
    }) !== 'COMPLETE'

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
          {canEdit && (
            <RequiredAuth roles={['student']}>
              <DropdownMenuItem
                onClick={() => {
                  action(item.id)
                }}
              >
                {message.dropdown.edit}
              </DropdownMenuItem>
            </RequiredAuth>
          )}

          {canMoveToBacklog && (
            <RequiredAuth roles={['student']}>
              <DropdownMenuItem onClick={handleMoveToBacklog}>
                {message.dropdown.moveToBacklog}
              </DropdownMenuItem>
              <DropdownMenuItem className='cancel' onClick={handleDelete}>
                {message.dropdown.delete}
              </DropdownMenuItem>
            </RequiredAuth>
          )}
          {item.status === 'DONE' && (
            <DropdownMenuItem onClick={handleReopen}>
              {message.dropdown.reopen}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SprintCardInSprint
