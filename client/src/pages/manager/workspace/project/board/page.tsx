import Board from '@/components/board/Board'
import FilterBoard from '@/components/board/FilterBoard'
import { DataOnMoveType, Position } from '@/components/board/type'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch } from '@/context/redux/hook'
import { getPositionThunk, saveIssues } from '@/feature/board/board.slice'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import useBoard from '@/hooks/use-board'
import { DEFAULT_POSITION, toBoardModel } from '@/lib/board.helper'
import boardService from '@/services/board.service'
import { IssueResponse } from '@/types/issue.type'
import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

type OnMove = ComponentProps<typeof Board>['onMove']

const BoardPage = () => {
  const { projectId } = useAppId()
  const { sprint } = useBoard()
  const dispatch = useAppDispatch()
  const { data, isFetching } = useGetListIssueQuery(
    {
      projectId: projectId as Id,
      sprintId: sprint?.id as Id
    },
    {
      skip: !projectId || !sprint?.id
    }
  )

  const [columns, setColumns] = useState<Position>(DEFAULT_POSITION)
  const currentColumns = useRef<Position>(columns)

  useEffect(() => {
    if (!isFetching) {
      dispatch(saveIssues(data))
      if (projectId) dispatch(getPositionThunk(projectId))
    }
  }, [data, isFetching, projectId, dispatch])

  useEffect(() => {
    if (projectId) {
      boardService.getPosition(projectId).then((res) => {
        setColumns(res)
      })
    }
  }, [projectId])

  useEffect(() => {
    if (currentColumns.current === columns) return
    currentColumns.current = columns
    if (projectId) {
      console.log('Saving position:', columns)
      boardService.savePosition(projectId, columns).then((res) => {
        toast.message('Position saved successfully')
      })
    }
  }, [columns])

  const findColumn = useCallback(
    (active: Id) => {
      if (!columns) return null
      for (const [key, value] of Object.entries(columns)) {
        if (value.includes(active)) {
          return key as IssueStatus
        }
      }
      return null
    },
    [columns]
  )

  const findIndex = useCallback(
    (active: Id) => {
      if (!columns) return null
      for (const value of Object.values(columns)) {
        if (value.includes(active)) {
          return value.indexOf(active)
        }
      }
      return null
    },
    [columns]
  )

  useEffect(() => {
    console.log('columns', columns)
  }, [columns])

  const handleOnMove = ({ active, columnTo, indexTo }: DataOnMoveType) => {
    // // console.log('handleOnMove', active, columnTo, indexTo)
    const oldActiveIndex = findIndex(active)
    const newActiveIndex = indexTo
    const oldColumn: IssueStatus | null = findColumn(active)
    const newColumn = columnTo as IssueStatus | null
    // console.log(oldActiveIndex, newActiveIndex, oldColumn, newColumn)
    if (
      oldActiveIndex === null ||
      newActiveIndex === null ||
      oldColumn === null ||
      newColumn === null
    )
      return
    if (oldColumn === newColumn) {
      // Same column => swap
      const itemsNewColumn = arrayMove(
        columns[oldColumn],
        oldActiveIndex,
        newActiveIndex
      )
      setColumns((prev) => {
        return {
          ...(prev ?? {}),
          [oldColumn]: itemsNewColumn
        }
      })
    }
    if (oldColumn !== newColumn) {
      // Different column
      // remove old column
      const itemsOldColumn = cloneDeep(columns[oldColumn])
      // remove
      itemsOldColumn.splice(oldActiveIndex, 1)
      console.log('itemsNewColumn', columns[newColumn])
      let itemsNewColumn = cloneDeep(columns[newColumn])
      // insert
      itemsNewColumn.splice(newActiveIndex, 0, active)
      setColumns((prev) => {
        return {
          ...(prev ?? {}),
          [oldColumn]: itemsOldColumn,
          [newColumn]: itemsNewColumn
        }
      })
    }
  }

  return (
    <div>
      <FilterBoard />
      {isFetching && <Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      {!isFetching && columns && (
        <RenderBoard
          data={{
            columns: columns,
            items: data || []
          }}
          handleOnMove={(data) => {
            handleOnMove({
              active: data.active,
              columnTo: data.columnTo,
              indexTo: data.indexTo
            })
          }}
        />
      )}
    </div>
  )
}

type RenderBoardProps = {
  data: {
    columns: Position
    items: IssueResponse[]
  }
  handleOnMove: OnMove
}

const RenderBoard = ({ data, handleOnMove }: RenderBoardProps) => {
  const dataToRender = cloneDeep(toBoardModel(data.items, data.columns))
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
