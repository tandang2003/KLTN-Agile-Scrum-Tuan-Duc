import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import SprintTemplateBaseForm from '@/components/sprint/template/SprintTemplateBaseForm'
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import {
  useCreateSprintMutation,
  useGetListSprintQuery,
  useUpdateSprintMutation
} from '@/feature/sprint/sprint.api'
import { closeDialogCreateSprint } from '@/feature/sprint/sprint.slice'
import { handleErrorApi } from '@/lib/form'
import { Id } from '@/types/other.type'
import { BaseSprintFormType } from '@/types/sprint.type'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

type TemplateSprintDialogProps = {} & DialogControllerProps
const TemplateSprintDialog = ({ open, onOpen }: TemplateSprintDialogProps) => {
  const { mode } = useAppSelector((state) => state.sprintSlice)
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const sprintId = useAppSelector((state) => state.sprintSlice.current?.id)
  const { data } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const dataSprint = data?.find((item) => item.id === sprintId)
  const [createSprint] = useCreateSprintMutation()
  const [updateSprint] = useUpdateSprintMutation()
  const dispatch = useAppDispatch()

  const handleCreateSprint = (
    values: BaseSprintFormType,
    form: UseFormReturn<BaseSprintFormType>
  ) => {
    if (!workspaceId) return
    createSprint({
      ...values,
      workspaceId: workspaceId
    })
      .unwrap()
      .then(({ id, title }) => {
        toast.success('Create sprint success', {
          description: `Sprint #${id} - ${title}`
        })
      })
      .then(() => {
        dispatch(closeDialogCreateSprint())
      })
      .catch((error) => {
        handleErrorApi({
          error: error,
          setError: form.setError
        })
        toast.error('Create sprint failed')
      })
  }

  const handleUpdateSprint = (
    values: BaseSprintFormType,
    form: UseFormReturn<BaseSprintFormType>
  ) => {
    if (!sprintId) return
    updateSprint({
      ...values,
      id: sprintId
    })
      .unwrap()
      .then(({ id, title }) => {
        toast.success('Update sprint success', {
          description: `Sprint #${id} - ${title}`
        })
      })
      .then(() => {
        dispatch(closeDialogCreateSprint())
      })
      .catch((error) => {
        handleErrorApi({
          error: error,
          setError: form.setError
        })
        toast.error('Update sprint failed')
      })
  }
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[50vw]'>
        <DialogHeader>
          <DialogTitle>Sprint</DialogTitle>
        </DialogHeader>
        {mode === 'create' && (
          <SprintTemplateBaseForm
            onSubmit={(values, form) => {
              handleCreateSprint(values, form)
            }}
          />
        )}
        {mode === 'update' && !dataSprint && (
          <Skeleton className='h-96 w-full' />
        )}
        {mode === 'update' && dataSprint && (
          <SprintTemplateBaseForm
            initialValues={{
              title: dataSprint.title,
              start: new Date(dataSprint.start),
              predict: new Date(dataSprint.predict),
              end: new Date(dataSprint.end),
              minimumStoryPoint: dataSprint.miniumStoryPoint
            }}
            onSubmit={(values, form) => {
              handleUpdateSprint(values, form)
            }}
            submitText='Update Sprint'
          />
        )}
      </DialogContent>
    </DialogController>
  )
}

export default TemplateSprintDialog
