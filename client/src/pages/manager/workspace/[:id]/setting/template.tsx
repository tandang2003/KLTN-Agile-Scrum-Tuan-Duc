import LoadingBoundary from '@/components/LoadingBoundary'
import SprintTemplate, {
  WorkspaceTemplateRef
} from '@/components/sprint/template/SprintTemplate'
import SprintTemplateDialog from '@/components/sprint/template/SprintTemplateDialog'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import {
  closeDialogCreateSprint,
  openDialogCreateSprint
} from '@/feature/sprint/sprint.slice'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { PlusIcon } from 'lucide-react'
import { useRef } from 'react'

const TemplateTab = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  const { isOpenDialogCreate: open } = useAppSelector(
    (state) => state.sprintSlice
  )
  const workspaceRef = useRef<WorkspaceTemplateRef>(null)
  const dispatch = useAppDispatch()

  return (
    <div>
      <Button
        variant='default'
        size='sm'
        onClick={() => {
          dispatch(openDialogCreateSprint())
        }}
      >
        <PlusIcon />
        Create Sprint
      </Button>

      <LoadingBoundary<SprintModel[]>
        data={data}
        isLoading={isFetching}
        fallback={'No sprint found'}
      >
        {(data) => {
          return <SprintTemplate ref={workspaceRef} sprints={data} />
        }}
      </LoadingBoundary>
      <SprintTemplateDialog
        open={open}
        onOpen={() => dispatch(closeDialogCreateSprint())}
      />
    </div>
  )
}

export default TemplateTab
