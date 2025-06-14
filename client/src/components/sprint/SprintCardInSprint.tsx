import Icon from '@/components/Icon'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useOpenIssueUpdate from '@/hooks/use-issue-update'
import { IssueResponse } from '@/types/issue.type'

type SprintCardInSprintProps = {
  item: IssueResponse
  index: number
}

const SprintCardInSprint = ({ index, item }: SprintCardInSprintProps) => {
  const { action } = useOpenIssueUpdate()

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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SprintCardInSprint
