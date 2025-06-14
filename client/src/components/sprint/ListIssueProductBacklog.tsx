import ListView from '@/components/ListView'

import SprintCard from '@/components/sprint/SprintCard'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/context/redux/hook'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import {
  enableCreateIssue,
  enableUpdateIssue
} from '@/feature/trigger/trigger.slice'
import useAppId from '@/hooks/use-app-id'
import { cn } from '@/lib/utils'
import { IssueResponse } from '@/types/issue.type'
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

  const handleUpdate = () => {
    dispatch(enableUpdateIssue())
  }

  return (
    <ListView<IssueResponse>
      data={data}
      loading={isFetching}
      emptyComponent={''}
      className={cn('gap-3')}
      render={(item) => {
        return <SprintCard data={item} />
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
