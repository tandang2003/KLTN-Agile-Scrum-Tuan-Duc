import { useAppDispatch } from '@/context/redux/hook'
import { restoreUserThunk } from '@/feature/auth/auth.slice'
import { setProjectState } from '@/feature/project/project.slice'
import { setCurrentWorkspaceId } from '@/feature/workspace/workspace.slice'
import tokenService from '@/services/token.service'
import { ReactNode, useEffect, useState } from 'react'
type StateLoaderProps = {
  children?: ReactNode
  loading?: ReactNode
}
const StateLoader = ({ children, loading }: StateLoaderProps) => {
  const dispatch = useAppDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const projectToken = tokenService.getTokenProjectSession()
    const workspaceId = tokenService.getWorkspaceLatest()
    if (workspaceId) dispatch(setCurrentWorkspaceId(workspaceId))
    if (projectToken) {
      dispatch(
        setProjectState({
          token: projectToken.token,
          projectIds: projectToken.projectIds,
          projectId: projectToken.projectId
        })
      )
      tokenService.setTokenProjectSession(projectToken)
    }

    dispatch(restoreUserThunk())

    const timer = setTimeout(() => {
      setIsLoaded(true) // ✅ Corrected here
    }, 500)
    return () => clearTimeout(timer)
  }, [dispatch])

  if (!isLoaded) return loading || null // ✅ Only show loading while not loaded

  return <>{children}</>
}
export default StateLoader
