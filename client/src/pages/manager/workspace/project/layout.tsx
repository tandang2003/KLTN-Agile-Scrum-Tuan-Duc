import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { getTokenProjectThunk } from '@/feature/project/project.slice'
import { setCurrentWorkspaceId } from '@/feature/workspace/workspace.slice'
import tokenService from '@/services/token.service'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProjectLayout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)

  // ✅ Ensure workspaceId is set
  useEffect(() => {
    if (!workspaceId) {
      const workspaceIdSession = tokenService.getWorkspaceLatest()
      if (!workspaceIdSession) {
        navigate('/manager')
      } else {
        dispatch(setCurrentWorkspaceId(workspaceIdSession))
      }
    }
  }, [workspaceId, dispatch, navigate])

  // ✅ Get project token if missing
  useEffect(() => {
    const session = tokenService.getTokenProjectSession()
    if (workspaceId && session == null) {
      dispatch(getTokenProjectThunk(workspaceId))
    }
  }, [workspaceId, dispatch])
  return <Outlet />
}

export default ProjectLayout
