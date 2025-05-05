import UpdateWorkspaceForm from '@/components/form/UpdateWorkspaceForm'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import { WorkspaceParams } from '@/types/route.type'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const WorkspaceSettingPage = () => {
  const { workspaceId } = useParams<WorkspaceParams>()
  const navigate = useNavigate()

  const { data, isFetching } = useGetWorkspaceQuery(workspaceId as string, {
    skip: !workspaceId
  })

  useEffect(() => {
    if (!workspaceId || (!isFetching && !data)) {
      navigate('/404')
    }
  }, [data, navigate, workspaceId, isFetching])

  return (
    <div className='container-sidebar'>
      {isFetching && <Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      {!isFetching && data && <UpdateWorkspaceForm data={data} />}
    </div>
  )
}

export default WorkspaceSettingPage
