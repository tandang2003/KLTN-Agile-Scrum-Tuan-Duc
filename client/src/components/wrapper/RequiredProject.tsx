import Loading from '@/components/Loading'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { getTokenProjectThunk } from '@/feature/project/project.slice'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RequiredProject = () => {
  const [isAllowed, setIsAllowed] = useState<boolean>(false) // null = loading
  const [loading, setLoading] = useState<boolean>(true)
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!workspaceId) return
    setLoading(true)
    dispatch(getTokenProjectThunk(workspaceId))
      .unwrap()
      .then(() => {
        setIsAllowed(true)
      })
      .catch(() => {
        setIsAllowed(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loading />
  }

  if (!isAllowed) {
    return <Navigate to='/unauthorized' replace />
  }

  return <Outlet />
}

export default RequiredProject
