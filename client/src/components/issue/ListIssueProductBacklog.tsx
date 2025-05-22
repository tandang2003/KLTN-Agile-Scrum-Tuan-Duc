import ListView from '@/components/ListView'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/context/redux/hook'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import { enableCreateIssue } from '@/feature/trigger/trigger.slice'
import useAppId from '@/hooks/use-app-id'
import { cn } from '@/lib/utils'
import { IssueResponse1 } from '@/types/issue.type'
import { Id } from '@/types/other.type'

const ListIssueProductBacklog = () => {
  const dispatch = useAppDispatch()
  const { projectId } = useAppId()
  const { data, isFetching } = useGetListIssueQuery(
    {
      projectId: projectId as Id
    },
    {
      skip: !projectId
    }
  )
  return (
    <ListView<IssueResponse1>
      data={data}
      loading={isFetching}
      className={cn('gap-3')}
      render={(item) => {
        return (
          <div
            className='flex rounded-sm border-2 bg-white px-4 py-2'
            key={item.id}
          >
            <div className='font-semibold'>
              {item.id}: <span>{item.name}</span>
            </div>
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
          }}
        >
          Create issue
        </Button>
      }
    />
  )
}

export default ListIssueProductBacklog
