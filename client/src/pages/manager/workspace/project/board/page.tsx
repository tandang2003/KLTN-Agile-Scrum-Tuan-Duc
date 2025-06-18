import FilterBoard from '@/components/board/FilterBoard'
import RenderBoard from '@/components/board/RenderBoard'
import { DataOnMoveType, Position } from '@/components/board/type'
import DialogUpdateIssue from '@/components/issue/DialogUpdateIssue'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppSelector } from '@/context/redux/hook'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import { DEFAULT_POSITION } from '@/lib/board.helper'
import boardService from '@/services/board.service'
import issueService from '@/services/issue.service'
import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { ProjectParams } from '@/types/route.type'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const BoardPage = () => {
  const { projectId } = useParams<ProjectParams>()

  const { sprintId } = useAppSelector((state) => state.boardSlice.filter)

  const { data, isFetching, error } = useGetListIssueQuery(
    {
      projectId: projectId as Id,
      sprintId: sprintId as Id
    },
    {
      skip: !projectId || !sprintId
    }
  )

  useEffect(() => {
    if (error) {
      toast.error('An error occurred while fetching issues')
    }
  }, [error])

  const [columns, setColumns] = useState<Position>(DEFAULT_POSITION)

  useEffect(() => {
    if (projectId && sprintId) {
      console.log('data', projectId, sprintId)

      boardService
        .getPositionBySprint({
          projectId: projectId,
          sprintId: sprintId
        })
        .then((res) => {
          setColumns(res)
        })
    }
  }, [projectId, sprintId])

  // useEffect(() => {
  //   if (currentSprintId) {
  //     dispatch(setSprintIdFilter(currentSprintId))
  //   }
  // }, [currentSprintId])

  const handleOnChangeAPI = useCallback(
    (issue: DataOnMoveType, mode: 'same' | 'diff', position: Position) => {
      if (projectId && sprintId) {
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
            sprintId: sprintId,
            position: position
          })
        ])

        return promises
      }
    },
    [projectId, sprintId]
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
      <DialogUpdateIssue />
    </div>
  )
}

export default BoardPage
