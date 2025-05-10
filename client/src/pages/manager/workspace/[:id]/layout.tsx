import { useAppDispatch } from '@/context/redux/hook'
import { getTokenProjectThunk } from '@/feature/project/project.slice'
import { setCurrentWorkspaceId } from '@/feature/workspace/workspace.slice'
import { WorkspaceParams } from '@/types/route.type'
import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

const WorkspaceDetailLayout = () => {
  const { workspaceId } = useParams<WorkspaceParams>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!workspaceId) {
      navigate('/404', { replace: true })
      return
    }
    dispatch(setCurrentWorkspaceId(workspaceId))
    dispatch(getTokenProjectThunk()).unwrap()
  }, [navigate, workspaceId, dispatch])
  return (
    <Outlet
      context={{
        workspaceId: workspaceId
      }}
    />
  )
}

export default WorkspaceDetailLayout
