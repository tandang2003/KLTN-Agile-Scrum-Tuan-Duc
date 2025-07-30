import Icon from '@/components/Icon'
import Message from '@/components/Message'
import DeleteDropdownItem from '@/components/sprint/action/DeleteDropdownItem'
import UpdateDropdownItem from '@/components/sprint/action/UpdateDropdownItem'
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
import { HttpStatusCode } from '@/constant/app.const'
import messages from '@/constant/message.const'
import { useMoveIssueToSprintMutation } from '@/feature/issue/issue.api'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import useSprintCurrent from '@/hooks/use-sprint-current'
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
  const message = messages.component.sprint.sprintCardInBacklog
  const { workspaceId } = useAppId()
  const [moveToSprint] = useMoveIssueToSprintMutation()
  const { data: sprints, refetch } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()

  const handleUpdateSprint = (sprintId: Id) => {
    moveToSprint({
      id: item.id,
      sprintId: sprintId
    })
      .unwrap()
      .then(() => {
        refetch()
        toast.message(message.toast.moveToSprint.success.message, {
          description: (
            <Message
              template={message.toast.moveToSprint.success.description}
              values={{
                name: item.name
              }}
            />
          )
        })
        // boardService
        //   .saveNewPosition({
        //     projectId: item.projectId,
        //     sprintId: sprintId,
        //     issueId: item.id,
        //     status: 'TODO'
        //   })
        //   .then(() => {

        //   })
      })
      .catch((err) => {
        if (err.status === HttpStatusCode.Conflict)
          toast.error(message.toast.moveToSprint.conflict)
        else toast.error(message.toast.moveToSprint.failed)
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
            <UpdateDropdownItem id={item.id} />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {message.dropdown.moveToSprint}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {sprints &&
                    sprints.map((sprint) => (
                      <DropdownMenuItem
                        onClick={() => {
                          handleUpdateSprint(sprint.id)
                        }}
                        disabled={
                          getStatusSprint({
                            end: sprint.end,
                            start: sprint.start,
                            id: sprint.id
                          }) != 'PENDING'
                        }
                        key={sprint.id}
                        className='cursor-pointer'
                      >
                        {sprint.title}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DeleteDropdownItem
              id={item.id}
              name={item.name}
              projectId={item.projectId}
              status={item.status}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </RequiredAuth>
    </div>
  )
}

export default SprintCardInProductBacklog
