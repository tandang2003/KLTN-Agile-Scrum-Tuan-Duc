import { useAppSelector } from '@/context/redux/hook'
import { ProjectParams } from '@/types/route.type'
import { useParams } from 'react-router-dom'

const useAppId = () => {
  const router = useParams<ProjectParams>()

  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { projectIds, projectId } = useAppSelector(
    (state) => state.projectSlice
  )

  let projectIdByRole = projectId
  if (
    router?.projectId &&
    projectIds?.length != 0 &&
    projectIds?.includes(router.projectId)
  ) {
    projectIdByRole = router.projectId
  }
  return {
    workspaceId,
    projectId: projectIdByRole,
    projectIds
  }
}

export default useAppId
