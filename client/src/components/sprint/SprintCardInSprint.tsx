import Icon from '@/components/Icon'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useUpdateIssueMutation } from '@/feature/issue/issue.api'
import useOpenIssueUpdate from '@/hooks/use-issue-update'
import { IssueResponse } from '@/types/issue.type'
import { toast } from 'sonner'

type SprintCardInSprintProps = {
  item: IssueResponse
  index: number
}

const SprintCardInSprint = ({ index, item }: SprintCardInSprintProps) => {
  const { action } = useOpenIssueUpdate()
  const [update] = useUpdateIssueMutation()
  const handleMoveToBacklog = () => {
    update({
      id: item.id,
      sprintId: undefined,
      fieldChanging: 'sprint'
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
          <DropdownMenuItem
            onClick={() => {
              action(item.id)
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleMoveToBacklog}>
            Move to backlog
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SprintCardInSprint
