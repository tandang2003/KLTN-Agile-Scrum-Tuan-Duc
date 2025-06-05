import ListView from '@/components/ListView'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/context/redux/hook'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import { setCurrentSprint } from '@/feature/sprint/sprint.slice'
import { enableCreateIssue } from '@/feature/trigger/trigger.slice'
import useAppId from '@/hooks/use-app-id'
import { cn } from '@/lib/utils'
import { IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'
type ListIssueProps = {
  sprintId: Id
  start: Date
  end: Date
}

const ListIssue = ({ sprintId, start, end }: ListIssueProps) => {
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
      className={cn('gap-3')}
      emptyComponent={
        <div className='flex rounded-sm border-2 bg-white px-4 py-2'>
          Not has any issues
        </div>
      }
      render={(item, index) => {
        return (
          <div
            className='flex rounded-sm border-2 bg-white px-4 py-2'
            key={item.id}
          >
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
          </div>
        )
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
export default ListIssue
