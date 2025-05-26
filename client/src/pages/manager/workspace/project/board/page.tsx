import Board from '@/components/board/Board'
import DialogUpdateIssue from '@/components/issue/DialogUpdateIssue'
import LoadingBoundary from '@/components/LoadingBoundary'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { useLazyGetListIssueQuery } from '@/feature/issue/issue.api'
import { disableUpdateIssue } from '@/feature/trigger/trigger.slice'
import useAppId from '@/hooks/use-app-id'
import { toBoardModel } from '@/lib/board'
import { IssueResponse } from '@/types/issue.type'
import { cloneDeep } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'

const BoardPage = () => {
  const { projectId } = useAppId()

  const [trigger, { data, isFetching }] = useLazyGetListIssueQuery()

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const isUpdateIssue = useAppSelector(
    (state: RootState) => state.triggerSlice.isUpdateIssue
  )

  const resetData = useCallback(() => {
    if (projectId)
      trigger({
        projectId
      })
  }, [trigger])

  useEffect(() => {
    resetData()
  }, [trigger])

  const dispatch = useAppDispatch()

  return (
    <LoadingBoundary<IssueResponse[]>
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
                  onOpen={() => {
                    dispatch(disableUpdateIssue())
                    if (projectId) {
                      trigger({
                        projectId
                      })
                    }
                  }}
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
