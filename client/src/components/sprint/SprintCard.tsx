import { IssueResponse } from '@/types/issue.type'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import ToolTip from '@/components/Tooltip'
import Icon from '@/components/Icon'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import { Id } from '@/types/other.type'
import { useUpdateIssueMutation } from '@/feature/issue/issue.api'
import { toast } from 'sonner'
type SprintCardProps = {
  data: IssueResponse
}

const SprintCard = ({ data: item }: SprintCardProps) => {
  const { workspaceId } = useAppId()
  const [update] = useUpdateIssueMutation()
  const { data: sprints } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const handleUpdateSprint = (sprintId: Id) => {
    update({
      id: item.id,
      sprintId: sprintId,
      fieldChanging: 'sprint'
    })
      .unwrap()
      .then((res) => {
        toast.message("Issue's sprint updated successfully")
      })
  }
  return (
    <div className='flex rounded-sm border-2 bg-white px-4 py-2' key={item.id}>
      <ToolTip
        trigger={
          <div className='font-semibold'>
            <span>{item.name}</span>
          </div>
        }
      >
        {item.id}
      </ToolTip>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon icon={'ri:more-fill'} className='mr-3 ml-auto' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Move to sprint</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {sprints &&
                  sprints.map((sprint) => (
                    <DropdownMenuItem
                      onClick={() => {
                        handleUpdateSprint(sprint.id)
                      }}
                      key={sprint.id}
                      className='cursor-pointer'
                    >
                      {sprint.title}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default SprintCard
