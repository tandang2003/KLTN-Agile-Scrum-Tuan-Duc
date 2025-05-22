import LoadingBoundary from '@/components/LoadingBoundary'
import SprintAccordion from '@/components/sprint/SprintAccordion'
import { useAppSelector } from '@/context/redux/hook'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import { Id } from '@/types/other.type'

const BacklogPage = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { data = [], isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  return (
    <div className='px-4'>
      <LoadingBoundary
        isLoading={isFetching}
        fallbackCondition={!data}
        fallback={
          <div>No sprint template, please wait teacher add sprint template</div>
        }
      >
        <SprintAccordion sprints={data} />
      </LoadingBoundary>
    </div>
  )
}

export default BacklogPage
