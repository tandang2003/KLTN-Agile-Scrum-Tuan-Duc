import FilterBoard from '@/components/board/FilterBoard'
import RenderBoard from '@/components/board/RenderBoard'
import { DataOnMoveType, Position } from '@/components/board/type'
import Empty from '@/components/Empty'
import DialogUpdateIssue from '@/components/issue/DialogUpdateIssue'
import LoadingBoundary from '@/components/LoadingBoundary'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppSelector } from '@/context/redux/hook'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { DEFAULT_POSITION } from '@/lib/board.helper'
import boardService from '@/services/board.service'
import issueService from '@/services/issue.service'
import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { ProjectParams } from '@/types/route.type'
import { arrayMove } from '@dnd-kit/sortable'
import { isAxiosError } from 'axios'
import { cloneDeep } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'sonner'

const BoardPage = () => {
  const { projectId } = useOutletContext<ProjectParams>()
  const [columns, setColumns] = useState<Position>(DEFAULT_POSITION)
  const sprint = useAppSelector((state) => state.boardSlice.filter.sprint)
  const sprintId = sprint?.id
  const { sprint: currentSprint } = useSprintCurrent()
  const { data, isFetching, refetch } = useGetListIssueQuery(
    {
      projectId: projectId as Id,
      sprintId: sprintId as Id
    },
    {
      skip: !projectId || !sprintId
    }
  )
  useEffect(() => {
    if (projectId && sprintId) {
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

  const isDisabled = useMemo(() => {
    if (!projectId || !sprintId) return true
    if (!currentSprint) return true
    if (currentSprint.id !== sprintId) return true
    return false
  }, [projectId, sprintId, currentSprint])

  const handleOnChangeAPI = useCallback(
    async (
      issue: DataOnMoveType,
      mode: 'same' | 'diff',
      position: Position
    ) => {
      if (!projectId || !sprintId) return

      try {
        // If mode is different column, update status first
        if (mode === 'diff') {
          await issueService.updateStatus({
            id: issue.active,
            status: issue.columnTo as IssueStatus,
            position: ''
          })
          // Rollback
          // await Promise.reject(new Error('Simulated failure'))
        }

        // If updateStatus succeeded or mode is same, update position
        await boardService.savePosition({
          projectId,
          sprintId,
          position
        })
      } catch (error) {
        if (isAxiosError(error)) {
          toast.warning('Cảnh báo', {
            description: error.response?.data?.message ?? ''
          })
        }
        return Promise.reject(error)
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

  const handleOnMove = async (data: DataOnMoveType): Promise<void> => {
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
      return handleOnChangeAPI(data, 'same', position)?.then(() => {
        setColumns(position)
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
      return handleOnChangeAPI(data, 'diff', position)?.then(() => {
        setColumns(position)
      })
    }
  }

  return (
    <div>
      <FilterBoard onRefresh={refetch} />
      <LoadingBoundary
        data={data}
        isLoading={isFetching}
        fallback={<Empty>Chưa có sprint nào đang chạy</Empty>}
        loading={<Skeleton className={'active-bg h-[200px] rounded-xl'} />}
      >
        {(data) => {
          return (
            <RenderBoard
              data={{
                columns: columns,
                items: data || []
              }}
              handleOnMove={(data) => {
                return handleOnMove({
                  active: data.active,
                  columnTo: data.columnTo,
                  indexTo: data.indexTo
                })
              }}
              disabled={isDisabled}
            />
          )
        }}
      </LoadingBoundary>

      <DialogUpdateIssue />
    </div>
  )
}

export default BoardPage
