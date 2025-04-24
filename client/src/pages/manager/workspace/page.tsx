import WorkspaceCard from '@/components/card/WorkspaceCard'
import Container from '@/components/Container'
import DialogCreateWorkspace from '@/components/dialog/DialogCreateWorkspace'
import Icon from '@/components/Icon'
import ListView from '@/components/ListView'
import { Button } from '@/components/ui/button'
import { useGetListWorkSpaceQuery } from '@/feature/workspace/workspace.api'
import { WorkspaceCardResponse } from '@/types/workspace.type'
import { useState } from 'react'

const WorkspacePage = () => {
  const { data, isFetching } = useGetListWorkSpaceQuery()
  const [openCreatedDialog, setOpenCreatedDialog] = useState<boolean>(false)
  return (
    <Container inSidebar>
      <div className='flex justify-between pt-2 pb-4'>
        <h2 className='h2'>Work Spaces</h2>
        <Button
          variant={'ghost'}
          onClick={() => setOpenCreatedDialog(!openCreatedDialog)}
        >
          <Icon icon={'lucide:plus'} />
        </Button>
      </div>
      <ListView<WorkspaceCardResponse>
        data={data}
        loading={isFetching}
        loadingItems={{
          items: 10
        }}
        display='grid'
        className='grid-cols-3 gap-10'
        render={(item) => (
          <WorkspaceCard
            key={item.id}
            id={item.id}
            name={item.name}
            owner={item.owner}
          />
        )}
      />
      <DialogCreateWorkspace
        open={openCreatedDialog}
        onOpen={(open) => setOpenCreatedDialog(open)}
      />
    </Container>
  )
}

export default WorkspacePage
