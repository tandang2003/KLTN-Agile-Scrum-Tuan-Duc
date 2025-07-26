import { useAlertHost } from '@/components/AlertHost'
import Icon from '@/components/Icon'
import Message from '@/components/Message'
import DeleteDropdownItem from '@/components/sprint/action/DeleteDropdownItem'
import UpdateDropdownItem from '@/components/sprint/action/UpdateDropdownItem'
import ViewDropdownItem from '@/components/sprint/action/ViewDropdownItem'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { HttpStatusCode } from '@/constant/app.const'
import messages from '@/constant/message.const'
import {
  useMoveIssueToBacklogMutation,
  useReopenIssueMutation
} from '@/feature/issue/issue.api'
import useAuthGuard from '@/hooks/use-auth'
import useSprintCurrent from '@/hooks/use-sprint-current'
import boardService from '@/services/board.service'
import { IssueResponse } from '@/types/issue.type'
import { toast } from 'sonner'

type SprintCardInSprintProps = {
  item: IssueResponse
  sprint: {
    id: string
    start: Date
    end: Date
  }
  index: number
}

const SprintCardInSprint = ({
  index,
  item,
  sprint
}: SprintCardInSprintProps) => {
  const message = messages.component.sprint.sprintCardInSprint
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const [moveToBacklog] = useMoveIssueToBacklogMutation()
  const { showAlert } = useAlertHost()
  const [reopen] = useReopenIssueMutation()
  const { id, name, status, projectId } = item
  const { id: sprintId, start, end } = sprint
  const { hasRequiredRole } = useAuthGuard({ roles: ['student'] })

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

  const canMoveToBacklog =
    start &&
    end &&
    getStatusSprint({
      id: sprintId,
      start: start,
      end: end
    }) === 'PENDING' &&
    hasRequiredRole
  const canDelete =
    start &&
    end &&
    getStatusSprint({
      id: sprintId,
      start: start,
      end: end
    }) !== 'COMPLETE' &&
    hasRequiredRole

  const canEdit =
    start &&
    end &&
    getStatusSprint({
      id: sprintId,
      start: start,
      end: end
    }) !== 'COMPLETE' &&
    hasRequiredRole

  const canReopen =
    start &&
    end &&
    getStatusSprint({
      id: sprintId,
      start: start,
      end: end
    }) === 'COMPLETE' &&
    item.status === 'DONE' &&
    hasRequiredRole

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
          {canEdit ? (
            <UpdateDropdownItem id={id} />
          ) : (
            <ViewDropdownItem id={id} />
          )}
          {canReopen && (
            <DropdownMenuItem onClick={handleReopen}>
              {message.dropdown.reopen}
            </DropdownMenuItem>
          )}
          {canMoveToBacklog && (
            <DropdownMenuItem onClick={handleMoveToBacklog}>
              {message.dropdown.moveToBacklog}
            </DropdownMenuItem>
          )}
          {canDelete && (
            <DeleteDropdownItem
              id={id}
              name={name}
              projectId={projectId}
              sprintId={sprintId}
              status={status}
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SprintCardInSprint
