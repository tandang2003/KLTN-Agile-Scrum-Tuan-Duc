import { Id } from '@/types/other.type'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import UpdateWorkspaceForm from '@/components/form/UpdateWorkspaceForm'
import { Skeleton } from '@/components/ui/skeleton'
import useAppId from '@/hooks/use-app-id'
import LoadingBoundary from '@/components/LoadingBoundary'
import { WorkspaceResponse } from '@/types/workspace.type'

const SummaryTab = () => {
  const { workspaceId } = useAppId()

  const { data, isFetching } = useGetWorkspaceQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  return (
    <LoadingBoundary<WorkspaceResponse>
      data={data}
      loading={<Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      isLoading={isFetching}
    >
      {(data) => <UpdateWorkspaceForm data={data} />}
    </LoadingBoundary>
  )
}

export default SummaryTab
