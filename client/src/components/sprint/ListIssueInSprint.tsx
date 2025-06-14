import ListView from '@/components/ListView'
import SprintCardInSprint from '@/components/sprint/SprintCardInSprint'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch } from '@/context/redux/hook'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import { setCurrentSprint } from '@/feature/sprint/sprint.slice'
import { enableCreateIssue } from '@/feature/trigger/trigger.slice'
import useAppId from '@/hooks/use-app-id'
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
  const dispatch = useAppDispatch()
  const { projectId } = useAppId()
  const { data, isFetching } = useGetListIssueQuery(
    {
      projectId: projectId as Id,
      sprintId
    },
    {
      skip: !sprintId || !projectId
    }
  )
  return (
    <ListView<IssueResponse>
      data={data}
      loading={isFetching}
      loadingComponent={<Skeleton className='h-[20px] w-full' />}
      className={cn('gap-3')}
      emptyComponent={
        <div className='flex rounded-sm border-2 bg-white px-4 py-2'>
          Not has any issues
        </div>
      }
      render={(item, index) => {
        return <SprintCardInSprint key={item.id} item={item} index={index} />
      }}
      append={
        <Button
          className='mt-2 w-full justify-start border-none'
          variant={'default'}
          onClick={() => {
            dispatch(enableCreateIssue())
            dispatch(
              setCurrentSprint({
                id: sprintId,
                start: new Date(start).toISOString(),
                end: new Date(end).toISOString()
              })
            )
          }}
        >
          Create issue
        </Button>
      }
    />
  )
}
export default ListIssueInSprint
