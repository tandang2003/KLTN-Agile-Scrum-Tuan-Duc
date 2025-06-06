import Board from '@/components/board/Board'
import FilterBoard from '@/components/board/FilterBoard'
import LoadingBoundary from '@/components/LoadingBoundary'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { getPositionThunk, saveIssues } from '@/feature/board/board.slice'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import { toBoardModel } from '@/lib/board'
import boardService from '@/services/board.service'
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

  useEffect(() => {
    if (!isFetching) {
      dispatch(saveIssues(data))
      if (projectId) dispatch(getPositionThunk(projectId))
    }
  }, [data, isFetching])

  const handleOnMove = (active, over) => {
    console.log('active', active.data.current?.sortable.items)
    console.log('over', over.data.current?.sortable.items)
    console.log('active', active.data.current?.sortable.items)
    console.log('over', over.data.current?.sortable.items)
    boardService.updatePosition()
  }

  return (
    <div>
      <FilterBoard />

      <LoadingBoundary<IssueResponse[]>
        data={data}
        fallback={<div>No result</div>}
        isLoading={isFetching}
        loading={<Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      >
        {(data) => {
          const dataToRender = toBoardModel(cloneDeep(data || []))
          return (
            <div className='flex-1'>
              <ScrollArea className='h-full'>
                <Board data={dataToRender} onMove={handleOnMove} />
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
