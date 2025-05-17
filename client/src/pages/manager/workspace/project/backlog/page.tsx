import SprintAccordion from '@/components/SprintAccordion'
import { useAppSelector } from '@/context/redux/hook'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import { Id } from '@/types/other.type'

const BacklogPage = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  return <div>{!isFetching && data && <SprintAccordion sprints={data} />}</div>
}

export default BacklogPage
