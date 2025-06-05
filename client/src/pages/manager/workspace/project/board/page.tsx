import Board from '@/components/board/Board'
import FilterBoard from '@/components/board/FilterBoard'
import LoadingBoundary from '@/components/LoadingBoundary'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { saveIssues } from '@/feature/board/board.slice'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import { toBoardModel } from '@/lib/board'
import { IssueResponse } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { cloneDeep } from 'lodash'
import { useEffect } from 'react'

const BoardPage = () => {
  const { projectId } = useAppId()
  const dispatch = useAppDispatch()
  const currentSprint = useAppSelector((state) => state.sprintSlice.current)
  const { data, isFetching } = useGetListIssueQuery(
    {
      projectId: projectId as Id,
      sprintId: currentSprint?.id
    },
    {
      skip: !projectId
    }
  )
  const { isLoading, items } = useAppSelector((state) => state.boardSlice)

  useEffect(() => {
    if (!isFetching) {
      dispatch(saveIssues(data))
    }
  }, [data, isFetching])

  return (
    <div>
      <FilterBoard />

      <LoadingBoundary<IssueResponse[]>
        data={items}
        fallback={<div>No result</div>}
        isLoading={isLoading}
        loading={<Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      >
        {(data) => {
          const boardData = toBoardModel(cloneDeep(data))

          return (
            <div className='flex-1'>
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
            </div>
          )
        }}
      </LoadingBoundary>
    </div>
  )
}

export default BoardPage
