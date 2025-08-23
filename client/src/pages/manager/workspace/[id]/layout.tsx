import { useAppDispatch } from '@/context/redux/hook'
import { setSprintFilter } from '@/feature/board/board.slice'
import { getTokenProjectThunk } from '@/feature/project/project.slice'
import { setSprintCurrent } from '@/feature/sprint/sprint.slice'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import { setCurrentWorkspaceId } from '@/feature/workspace/workspace.slice'
import { toISODateString } from '@/lib/date.helper'
import { WorkspaceParams } from '@/types/route.type'
import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

const WorkspaceDetailLayout = () => {
  const { workspaceId } = useParams<WorkspaceParams>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data } = useGetWorkspaceQuery(workspaceId as string, {
    skip: !workspaceId
  })
  useEffect(() => {
    if (!workspaceId) {
      navigate('/404', { replace: true })
      return
    }
    dispatch(setCurrentWorkspaceId(workspaceId))
    dispatch(getTokenProjectThunk(workspaceId))
  }, [navigate, workspaceId, dispatch])

  useEffect(() => {
    if (data?.currentSprint) {
      const { prevSprint, currentSprint, nextSprint } = data
      const { id, start, end } = currentSprint

      dispatch(
        setSprintCurrent({
          previous: prevSprint
            ? {
                id: prevSprint.id,
                start: toISODateString(prevSprint.start),
                end: toISODateString(prevSprint.end)
              }
            : undefined,
          current: {
            id: id,
            start: toISODateString(start),
            end: toISODateString(end)
          },
          next: nextSprint
            ? {
                id: nextSprint.id,
                start: toISODateString(nextSprint.start),
                end: toISODateString(nextSprint.end)
              }
            : undefined
        })
      )
      dispatch(
        setSprintFilter({
          id: data.currentSprint.id,
          start: toISODateString(data.currentSprint.start),
          end: toISODateString(data.currentSprint.end)
        })
      )
    }
  }, [data?.currentSprint, dispatch])

  return (
    <Outlet
      context={{
        workspaceId: workspaceId
      }}
    />
  )
}

export default WorkspaceDetailLayout
