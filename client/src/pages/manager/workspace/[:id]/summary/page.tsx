import { Id } from '@/types/other.type'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import UpdateWorkspaceForm from '@/components/form/UpdateWorkspaceForm'
import { Skeleton } from '@/components/ui/skeleton'
import useAppId from '@/hooks/use-app-id'
import LoadingBoundary from '@/components/LoadingBoundary'
import {
  WorkspaceDetailResponse,
  WorkspaceResponse
} from '@/types/workspace.type'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import ViewWorkspace from '@/components/form/ViewWorkspace'

const SummaryTab = () => {
  const { workspaceId } = useAppId()

  const { data, isFetching } = useGetWorkspaceQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  return (
    <LoadingBoundary<WorkspaceDetailResponse>
      data={data}
      loading={<Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      isLoading={isFetching}
    >
      {(data) => {
        return (
          <>
            <RequiredAuth roles={['teacher']}>
              <UpdateWorkspaceForm data={data} />
            </RequiredAuth>
            <RequiredAuth roles={['student']}>
              <ViewWorkspace data={data} />
            </RequiredAuth>
          </>
        )
      }}
    </LoadingBoundary>
  )
}

export default SummaryTab
