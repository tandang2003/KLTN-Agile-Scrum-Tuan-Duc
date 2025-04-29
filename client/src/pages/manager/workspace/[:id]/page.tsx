import ProjectTable from '@/components/datatable/project'
import workspaceService from '@/services/workspace.service'
import { WorkspaceParams } from '@/types/route.type'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams<WorkspaceParams>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!workspaceId) {
      navigate('/404', { replace: true })
      return
    }

    // const fetchData = async () => {
    //   try {
    //     const data = await workspaceService.getWorkSpace(workspaceId)
    //     console.log(data)
    //   } catch (_error) {
    //     navigate('/404', { replace: true })
    //   }
    // }

    // fetchData()
  }, [navigate, workspaceId])

  return (
    <div>
      {workspaceId}
      <ProjectTable className='container mx-auto py-10' />
    </div>
  )
}

export default WorkspaceDetailPage
