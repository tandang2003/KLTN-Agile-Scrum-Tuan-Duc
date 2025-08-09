import Empty from '@/components/Empty'
import ListView from '@/components/ListView'
import SprintCardInSprint from '@/components/sprint/SprintCardInSprint'
import { Skeleton } from '@/components/ui/skeleton'
import messages from '@/constant/message.const'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
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
  const message = messages.component.sprint.listIssueInSprint
  const { projectId } = useAppId()

  const { data, isFetching } = useGetListIssueQuery(
    {
      projectId: projectId as Id,
      sprintId
    },
    {
      skip: !sprintId || !projectId,
      refetchOnMountOrArgChange: true
    }
  )

  return (
    <ListView<IssueResponse>
      data={data}
      loading={isFetching}
      loadingComponent={<Skeleton className='h-[20px] w-full' />}
      className={cn('gap-3')}
      emptyComponent={<Empty>{message.list.empty}</Empty>}
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
    />
  )
}
export default ListIssueInSprint
