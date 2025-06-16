import Board from '@/components/board/Board'
import FilterBoard from '@/components/board/FilterBoard'
import { DataOnMoveType, Position } from '@/components/board/type'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import useBoard from '@/hooks/use-board'
import { DEFAULT_POSITION, toBoardModel } from '@/lib/board.helper'
import boardService from '@/services/board.service'
import issueService from '@/services/issue.service'
import { IssueResponse } from '@/types/issue.type'
import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'
import { ComponentProps, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

type OnMove = ComponentProps<typeof Board>['onMove']

const BoardPage = () => {
  const { projectId } = useAppId()
  const { sprint } = useBoard()
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

  useEffect(() => {
    if (projectId && sprint?.id) {
      boardService
        .getPositionBySprint({
          projectId: projectId,
          sprintId: sprint?.id as Id
        })
        .then((res) => {
          console.log('getPositionBySprint', res)
          setColumns(res)
        })
    }
  }, [projectId, sprint?.id])

  const handleOnChangeAPI = useCallback(
    (issue: DataOnMoveType, mode: 'same' | 'diff', position: Position) => {
      if (projectId && sprint?.id) {
        const promises = Promise.all([
          mode === 'same'
            ? Promise.resolve()
            : issueService.updateStatus({
                id: issue.active,
                status: issue.columnTo as IssueStatus,
                position: ''
              }),
          boardService.savePosition({
            projectId: projectId,
            sprintId: sprint.id as Id,
            position: position
          })
        ])

        return promises
      }
    },
    [projectId, sprint?.id]
  )

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

  // useEffect(() => {
  //   console.log('columns', columns)
  // }, [columns])

  const handleOnMove = (data: DataOnMoveType) => {
    // // console.log('handleOnMove', active, columnTo, indexTo)
    const { active, columnTo, indexTo } = data
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
      const position = {
        ...(columns ?? {}),
        [oldColumn]: itemsNewColumn
      }
      handleOnChangeAPI(data, 'same', position)?.then(() => {
        setColumns(position)
        toast.message('Position saved successfully')
      })
    }

    if (oldColumn !== newColumn) {
      // Different column
      // remove old column
      const itemsOldColumn = cloneDeep(columns[oldColumn])
      // remove
      itemsOldColumn.splice(oldActiveIndex, 1)
      let itemsNewColumn = cloneDeep(columns[newColumn])
      // insert
      itemsNewColumn.splice(newActiveIndex, 0, active)

      const position = {
        ...(columns ?? {}),
        [oldColumn]: itemsOldColumn,
        [newColumn]: itemsNewColumn
      }
      handleOnChangeAPI(data, 'diff', position)?.then(() => {
        setColumns(position)
        toast.message('Position saved successfully')
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
