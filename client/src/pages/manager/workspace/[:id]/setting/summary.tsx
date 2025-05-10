import { Id } from '@/types/other.type'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import UpdateWorkspaceForm from '@/components/form/UpdateWorkspaceForm'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppSelector } from '@/context/redux/hook'

const SummaryTab = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)

  const { data, isFetching } = useGetWorkspaceQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  return (
    <div>
      {isFetching && <Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      {!isFetching && data && <UpdateWorkspaceForm data={data} />}
    </div>
  )
}

export default SummaryTab
