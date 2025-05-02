import WorkspaceCard from '@/components/card/WorkspaceCard'
import Container from '@/components/Container'
import DialogCreateWorkspace from '@/components/dialog/DialogCreateWorkspace'
import Icon from '@/components/Icon'
import ListView from '@/components/ListView'
import { Button } from '@/components/ui/button'
import RequiredAuth from '@/components/wrapper/RequiredAuth'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { useGetListWorkspaceQuery } from '@/feature/workspace/workspace.api'
import { setStateDialogWorkspace } from '@/feature/workspace/workspace.slice'
import { WorkspaceCardResponse } from '@/types/workspace.type'

const WorkspacePage = () => {
  const { data, isFetching } = useGetListWorkspaceQuery({
    page: 0,
    size: 1
  })
  const dispatch = useAppDispatch()
  const isDialogCreateOpen = useAppSelector(
    (state: RootState) => state.workspaceSlice.isDialogCreateOpen
  )

  return (
    <Container inSidebar>
      <div className='flex justify-between pt-2 pb-4'>
        <h2 className='h2'>Work Spaces</h2>
        <RequiredAuth mode='hide' roles={['teacher']}>
          <Button
            variant={'ghost'}
            onClick={() =>
              dispatch(setStateDialogWorkspace(!isDialogCreateOpen))
            }
          >
            <Icon icon={'lucide:plus'} />
          </Button>
        </RequiredAuth>
      </div>
      <ListView<WorkspaceCardResponse>
        data={data?.items}
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
        open={isDialogCreateOpen}
        onOpen={(open) => dispatch(setStateDialogWorkspace(open))}
      />
    </Container>
  )
}

export default WorkspacePage
