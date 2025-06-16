import LoadingBoundary from '@/components/LoadingBoundary'
import SprintAccordion from '@/components/sprint/SprintAccordion'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { ProjectParams } from '@/types/route.type'
import { useParams } from 'react-router-dom'

const BacklogPage = () => {
  const { projectId, currentSprintId } = useParams<ProjectParams>()

  const { workspaceId } = useAppId()
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
