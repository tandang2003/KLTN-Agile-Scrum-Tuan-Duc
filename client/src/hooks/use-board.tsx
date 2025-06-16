import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { setSprintIdFilter } from '@/feature/board/board.slice'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import { Id } from '@/types/other.type'
import { useEffect } from 'react'

const useBoard = () => {
  const dispatch = useAppDispatch()
  const { sprintId } = useAppSelector((state) => state.boardSlice.filter)
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { data, isFetching } = useGetWorkspaceQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  useEffect(() => {
    if (data) {
      dispatch(setSprintIdFilter(data.currentSprint?.id))
    }
  }, [data])
  return {
    isFetching,
    sprint: sprintId
  }
}

export default useBoard
