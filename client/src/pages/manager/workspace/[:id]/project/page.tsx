import { ProjectDataTable } from '@/components/datatable/project/ProjectDataTable'
import LoadingBoundary from '@/components/LoadingBoundary'
import useAppId from '@/hooks/use-app-id'
import { Id } from '@/types/other.type'

const WorkspaceProjectPage = () => {
  const { workspaceId } = useAppId()
  return (
    <LoadingBoundary<Id> data={workspaceId}>
      {(data) => <ProjectDataTable workspaceId={data} />}
    </LoadingBoundary>
  )
}

export default WorkspaceProjectPage
