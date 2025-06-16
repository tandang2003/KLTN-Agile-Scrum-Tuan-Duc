import ListView from '@/components/ListView'

import SprintCardInProductBacklog from '@/components/sprint/SprintCardInProductBacklog'
import { Button } from '@/components/ui/button'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import { useAppDispatch } from '@/context/redux/hook'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import { setCurrentSprint } from '@/feature/sprint/sprint.slice'
import { enableCreateIssue } from '@/feature/trigger/trigger.slice'
import useAppId from '@/hooks/use-app-id'
import { cn } from '@/lib/utils'
import { IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'

const ListIssueInProductBacklog = () => {
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
    <ListView<IssueResponse>
      data={data}
      loading={isFetching}
      emptyComponent={
        <div className='flex rounded-sm border-2 bg-white px-4 py-2'>
          Not has any issues
        </div>
      }
      className={cn('gap-3')}
      render={(item) => {
        return <SprintCardInProductBacklog data={item} />
      }}
      append={
        <RequiredAuth mode='hide' roles={['student']}>
          <Button
            className='mt-2 w-full justify-start border-none'
            variant={'default'}
            onClick={() => {
              dispatch(setCurrentSprint(undefined))
              dispatch(enableCreateIssue())
            }}
          >
            Create issue
          </Button>
        </RequiredAuth>
      }
    />
  )
}

export default ListIssueInProductBacklog
