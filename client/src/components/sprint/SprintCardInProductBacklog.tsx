import Icon from '@/components/Icon'
import ToolTip from '@/components/Tooltip'
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
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import {
  useMoveIssueToSprintMutation,
  useReopenIssueMutation
} from '@/feature/issue/issue.api'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import useOpenIssueUpdate from '@/hooks/use-issue-update'
import { HttpStatusCode } from '@/constant/app.const'
import boardService from '@/services/board.service'
import { IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { toast } from 'sonner'
type SprintCardInProductBacklogProps = {
  data: IssueResponse
}

const SprintCardInProductBacklog = ({
  data: item
}: SprintCardInProductBacklogProps) => {
  const { workspaceId } = useAppId()
  const [moveToSprint] = useMoveIssueToSprintMutation()
  const [reopen] = useReopenIssueMutation()
  const { data: sprints, refetch } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const { action } = useOpenIssueUpdate()
  const handleUpdateSprint = (sprintId: Id) => {
    moveToSprint({
      id: item.id,
      sprintId: sprintId
    })
      .unwrap()
      .then(() => {
        refetch()
        boardService
          .saveNewPosition({
            projectId: item.projectId,
            sprintId: sprintId,
            issueId: item.id,
            status: 'TODO'
          })
          .then(() => {
            toast.message(`Issue ${item.name} moved to sprint successfully`)
          })
      })
      .catch((err) => {
        if (err.status === HttpStatusCode.Conflict)
          toast.error("Sprint is running, cannot update issue's sprint")
        else toast.error("Another error occurred while updating issue's sprint")
      })
  }

  const handleReopen = () => {
    reopen(item.id)
      .unwrap()
      .then(() => {
        toast.message(`Issue ${item.name} reopened successfully`)
      })
      .catch((err) => {
        if (err.status === HttpStatusCode.Conflict)
          toast.error('Issue is not in DONE status, cannot reopen')
        else toast.error('Another error occurred while reopening issue')
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

      <RequiredAuth mode='hide' roles={['student']}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Icon icon={'ri:more-fill'} className='mr-3 ml-auto' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {item.status === 'DONE' && (
              <DropdownMenuItem onClick={handleReopen}>Reopen</DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => {
                action(item.id)
              }}
            >
              Edit
            </DropdownMenuItem>
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
      </RequiredAuth>
    </div>
  )
}

export default SprintCardInProductBacklog
