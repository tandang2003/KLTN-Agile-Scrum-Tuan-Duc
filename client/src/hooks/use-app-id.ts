import { useAppSelector } from '@/context/redux/hook'

const useAppId = () => {
  const { isAuth } = useAppSelector((state) => state.authSlice)
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { projectIds, projectId } = useAppSelector(
    (state) => state.projectSlice
  )

  if (!isAuth) {
    throw Error('role is not exist')
  }
  return {
    workspaceId,
    projectId,
    projectIds
  }
}

export default useAppId
