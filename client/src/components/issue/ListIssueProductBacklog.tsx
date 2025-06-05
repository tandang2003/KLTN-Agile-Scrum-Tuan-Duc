import ListView from '@/components/ListView'

import { Badge } from '@/components/ui/badge'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Icon from '@/components/Icon'
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
        return (
          <div
            className='flex rounded-sm border-2 bg-white px-4 py-2'
            key={item.id}
          >
            <div className='font-semibold'>
              {item.id}: <span>{item.name}</span>
            </div>
            <div className='mr-3 ml-auto'>
              <Badge status={item.status}>{item.status}</Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Icon icon={'ri:more-fill'} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={handleUpdate}>Edit</DropdownMenuItem>
                <DropdownMenuItem className='bg-red-500 text-white hover:cursor-pointer hover:opacity-80'>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
