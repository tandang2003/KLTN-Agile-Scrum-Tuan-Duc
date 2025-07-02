import ListView from '@/components/ListView'
import SprintTemplateCard from '@/components/sprint/template/SprintTemplateCard'

import SprintTemplateDialog from '@/components/sprint/template/SprintTemplateDialog'
import { Button } from '@/components/ui/button'
import messages from '@/constant/message.const'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import {
  closeDialogCreateSprint,
  openDialogCreateSprint
} from '@/feature/sprint/sprint.slice'
import { Id } from '@/types/other.type'
import { PlusIcon } from 'lucide-react'

const WorkspaceSprintTemplatePage = () => {
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const { data, isFetching } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  const { isOpenDialogCreate: open } = useAppSelector(
    (state) => state.sprintSlice
  )
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className='my-2 flex justify-end'>
        <Button
          variant='default'
          size='sm'
          onClick={() => {
            dispatch(openDialogCreateSprint())
          }}
        >
          <PlusIcon />
          {messages.manager.workspace.detail.template.create}
        </Button>
      </div>

      <ListView
        data={data}
        loading={isFetching}
        className='flex flex-col gap-4'
        emptyComponent={
          <div className='mt-4'>
            {messages.manager.workspace.detail.template.list.empty}
          </div>
        }
        render={(item) => {
          return <SprintTemplateCard key={item.id} id={item.id} data={item} />
        }}
      />

      <SprintTemplateDialog
        open={open}
        onOpen={() => dispatch(closeDialogCreateSprint())}
      />
    </div>
  )
}

export default WorkspaceSprintTemplatePage
