import Board from '@/components/board/Board'
import DialogUpdateIssue from '@/components/dialog/DialogUpdateIssue'
import LoadingBoundary from '@/components/LoadingBoundary'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import { disableUpdateIssue } from '@/feature/trigger/trigger.slice'
import useAppId from '@/hooks/use-app-id'
import { toBoardModel } from '@/lib/board'
import { IssueResponse1 } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { cloneDeep } from 'lodash'
import { useRef } from 'react'

const BoardPage = () => {
  const { projectId } = useAppId()
  const { data, isFetching } = useGetListIssueQuery(
    { projectId: projectId as Id },
    {
      skip: !projectId
    }
  )
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const isUpdateIssue = useAppSelector(
    (state: RootState) => state.triggerSlice.isUpdateIssue
  )
  const dispatch = useAppDispatch()

  return (
    <LoadingBoundary<IssueResponse1[]>
      data={data}
      fallback={<div>No result</div>}
      isLoading={isFetching}
      loading={<Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
    >
      {(data) => {
        const boardData = toBoardModel(cloneDeep(data))
        return (
          <div ref={scrollAreaRef} className='flex-1'>
            {data && (
              <>
                <ScrollArea className='h-full'>
                  <Board
                    data={boardData}
                    onMove={({ active, columnTo, indexTo }) => {
                      console.log('active', active)
                      console.log('columnTo', columnTo)
                      console.log('indexTo', indexTo)
                    }}
                  />
                  <ScrollBar orientation='vertical' />
                  <ScrollBar orientation='horizontal' />
                </ScrollArea>
                <DialogUpdateIssue
                  open={isUpdateIssue}
                  onOpen={() => dispatch(disableUpdateIssue())}
                />
              </>
            )}
          </div>
        )
      }}
    </LoadingBoundary>
  )
}

export default BoardPage
