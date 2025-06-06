import Board from '@/components/board/Board'
import FilterBoard from '@/components/board/FilterBoard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { getPositionThunk, saveIssues } from '@/feature/board/board.slice'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import useBoard from '@/hooks/use-board'
import { toBoardModel } from '@/lib/board'
import boardService from '@/services/board.service'
import { IssueResponse, UpdatePositionIssueRequest } from '@/types/issue.type'
import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { cloneDeep } from 'lodash'
import { ComponentProps, useEffect } from 'react'

const BoardPage = () => {
  const { projectId } = useAppId()
  const { sprint } = useBoard()
  const dispatch = useAppDispatch()
  const currentSprint = useAppSelector((state) => state.sprintSlice.current)
  const { data, isFetching } = useGetListIssueQuery(
    {
      projectId: projectId as Id,
      sprintId: sprint?.id as Id
    },
    {
      skip: !projectId || !sprint?.id
    }
  )

  useEffect(() => {
    if (!isFetching) {
      dispatch(saveIssues(data))
      if (projectId) dispatch(getPositionThunk(projectId))
    }
  }, [data, isFetching, projectId, dispatch])

  const handleOnMove = (active, over) => {
    // Same column
    const id = active.id
    const status = active.data.current?.sortable.containerId as IssueStatus
    const indexId = over.data.current?.sortable.index
    let nextId =
      indexId === -1 ? null : active.data.current?.sortable.items[indexId + 1]

    const req: UpdatePositionIssueRequest = {
      id: id,
      status: status,
      position: nextId
    }
    console.log('req', req)
    // update here
  }

  return (
    <div>
      <FilterBoard />
      {isFetching && <Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      {!isFetching && <RenderBoard data={data} handleOnMove={handleOnMove} />}
    </div>
  )
}

type RenderBoardProps = {
  data?: IssueResponse[]
  handleOnMove?: ComponentProps<typeof Board>['onMove']
}

const RenderBoard = ({ data, handleOnMove }: RenderBoardProps) => {
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
}

export default BoardPage
