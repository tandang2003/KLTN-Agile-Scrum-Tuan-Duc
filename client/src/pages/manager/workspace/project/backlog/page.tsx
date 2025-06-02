import LoadingBoundary from '@/components/LoadingBoundary'
import SprintAccordion from '@/components/sprint/SprintAccordion'
import { useAppSelector } from '@/context/redux/hook'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'

const BacklogPage = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  return (
    <div className='px-4'>
      <LoadingBoundary<SprintModel[]>
        data={data}
        isLoading={isFetching}
        fallback={
          <div>No sprint template, please wait teacher add sprint template</div>
        }
      >
        {(data) => <SprintAccordion sprints={data} />}
      </LoadingBoundary>
    </div>
  )
}

export default BacklogPage
