import WorkspaceCard from '@/components/card/WorkspaceCard'
import Container from '@/components/Container'
import ListView from '@/components/ListView'
import { useGetListWorkSpaceQuery } from '@/feature/workspace/workspace.api'
import { WorkspaceCardResponse } from '@/types/workspace.type'

const WorkspacePage = () => {
  const { data, isFetching } = useGetListWorkSpaceQuery()

  return (
    <Container inSidebar>
      <h2 className='h2'>Work Spaces</h2>
      <ListView<WorkspaceCardResponse>
        data={data}
        loading={isFetching}
        orientation='horizontal'
        className='gap-5'
        render={(item) => (
          <WorkspaceCard
            key={item.id}
            id={item.id}
            name={item.name}
            owner={item.owner}
          />
        )}
      />
    </Container>
  )
}

export default WorkspacePage
