import { useAppDispatch } from '@/context/redux/hook'
import { setSprintIdFilter } from '@/feature/board/board.slice'
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
      dispatch(
        setSprintCurrent({
          id: data.currentSprint.id,
          start: toISODateString(data.currentSprint.start),
          end: toISODateString(data.currentSprint.end)
        })
      )
      dispatch(setSprintIdFilter(data.currentSprint.id))
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
