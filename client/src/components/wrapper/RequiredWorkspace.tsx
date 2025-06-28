import Loading from '@/components/Loading'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { setCurrentWorkspaceId } from '@/feature/workspace/workspace.slice'
import tokenService from '@/services/token.service'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RequiredWorkspace = () => {
  const [isAllowed, setIsAllowed] = useState(false)
  const [loading, setLoading] = useState(true)

  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const checkWorkspace = () => {
      if (workspaceId) {
        setIsAllowed(true)
      } else {
        const sessionId = tokenService.getWorkspaceLatest()
        if (sessionId) {
          dispatch(setCurrentWorkspaceId(sessionId))
          setIsAllowed(true)
        } else {
          setIsAllowed(false)
        }
      }
      setLoading(false)
    }

    checkWorkspace()
  }, [workspaceId, dispatch])

  if (loading) return <Loading />

  if (!isAllowed) return <Navigate to='/manager' replace />

  return <Outlet />
}

export default RequiredWorkspace
