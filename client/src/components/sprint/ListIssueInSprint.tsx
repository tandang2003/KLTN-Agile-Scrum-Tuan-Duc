import ListView from '@/components/ListView'
import SprintCardInSprint from '@/components/sprint/SprintCardInSprint'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import messages from '@/constant/message.const'
import { useAppDispatch } from '@/context/redux/hook'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import { setSprintActive } from '@/feature/sprint/sprint.slice'
import { enableCreateIssue } from '@/feature/trigger/trigger.slice'
import useAppId from '@/hooks/use-app-id'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { toISODateString } from '@/lib/date.helper'
import { cn } from '@/lib/utils'
import { IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'
type ListIssueInSprintProps = {
  sprintId: Id
  start: Date
  end: Date
}

const ListIssueInSprint = ({
  sprintId,
  start,
  end
}: ListIssueInSprintProps) => {
  const message = messages.component.sprint.listIssueInSprint
  const dispatch = useAppDispatch()
  const { projectId } = useAppId()
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const { data, isFetching } = useGetListIssueQuery(
    {
      projectId: projectId as Id,
      sprintId
    },
    {
      skip: !sprintId || !projectId
    }
  )

  const handleOpenCreateIssue = () => {
    dispatch(enableCreateIssue())
    dispatch(
      setSprintActive({
        id: sprintId,
        start: toISODateString(start),
        end: toISODateString(end)
      })
    )
  }

  return (
    <ListView<IssueResponse>
      data={data}
      loading={isFetching}
      loadingComponent={<Skeleton className='h-[20px] w-full' />}
      className={cn('gap-3')}
      emptyComponent={
        <div className='flex rounded-sm border-2 bg-white px-4 py-2'>
          {message.list.empty}
        </div>
      }
      render={(item, index) => {
        return (
          <SprintCardInSprint
            key={item.id}
            sprint={{ id: sprintId, start, end }}
            item={item}
            index={index}
          />
        )
      }}
      append={
        getStatusSprint({
          id: sprintId,
          start: new Date(start),
          end: new Date(end)
        }) !== 'COMPLETE' && (
          <RequiredAuth mode='hide' roles={['student']}>
            <Button
              className='mt-2 w-full justify-start border-none'
              variant={'default'}
              onClick={handleOpenCreateIssue}
            >
              {message.create}
            </Button>
          </RequiredAuth>
        )
      }
    />
  )
}
export default ListIssueInSprint
