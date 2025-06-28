import { StudentDataTable } from '@/components/datatable/student/StudentDataTable'
import LoadingBoundary from '@/components/LoadingBoundary'
import useAppId from '@/hooks/use-app-id'
import { Id } from '@/types/other.type'

const WorkspaceStudentPage = () => {
  const { workspaceId } = useAppId()
  return (
    <LoadingBoundary<Id> data={workspaceId}>
      {(data) => <StudentDataTable workspaceId={data} />}
    </LoadingBoundary>
  )
}

export default WorkspaceStudentPage
