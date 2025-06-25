import Icon from '@/components/Icon'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import { useMoveIssueToBacklogMutation } from '@/feature/issue/issue.api'
import useOpenIssueUpdate from '@/hooks/use-issue-update'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { IssueResponse } from '@/types/issue.type'
import { toast } from 'sonner'

type SprintCardInSprintProps = {
  item: IssueResponse
  index: number
}

const SprintCardInSprint = ({ index, item }: SprintCardInSprintProps) => {
  const { start, end, sprintId, id } = item
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const { action } = useOpenIssueUpdate()
  const [moveToBacklog] = useMoveIssueToBacklogMutation()
  const handleMoveToBacklog = () => {
    moveToBacklog({
      id: id,
      sprintId: sprintId
    })
      .unwrap()
      .then(() => {
        toast.success('Issue moved to backlog successfully', {
          description: `Issue ${item.name} has been moved to the backlog.`
        })
      })
      .catch((err) => {
        toast.error('Failed to move issue to backlog', {
          description: err.data?.message || 'An error occurred.'
        })
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
              Edit
            </DropdownMenuItem>
          </RequiredAuth>
          {canMoveToBacklog && (
            <DropdownMenuItem onClick={handleMoveToBacklog}>
              Move to backlog
            </DropdownMenuItem>
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
