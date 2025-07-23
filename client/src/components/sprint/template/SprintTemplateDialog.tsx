import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import Message from '@/components/Message'
import SprintTemplateBaseForm from '@/components/sprint/template/SprintTemplateBaseForm'
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { HttpStatusCode, WEIGHT_POSITION } from '@/constant/app.const'
import messages from '@/constant/message.const'
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

type SprintTemplateDialogProps = {} & DialogControllerProps
const SprintTemplateDialog = ({ open, onOpen }: SprintTemplateDialogProps) => {
  const { mode } = useAppSelector((state) => state.sprintSlice)
  const workspaceId = useAppSelector((state) => state.workspaceSlice.currentId)
  const sprintId = useAppSelector((state) => state.sprintSlice.active?.id)
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
    const position = (data?.length ?? 1) * WEIGHT_POSITION
    createSprint({
      ...values,
      position: position,
      workspaceId: workspaceId
    })
      .unwrap()
      .then(({ id, title }) => {
        toast.success(
          messages.component.sprint.template.dialog.toast.create.success
            .description,
          {
            description: (
              <Message
                template={
                  messages.component.sprint.template.dialog.toast.create.success
                    .description
                }
                values={{ title: title, id: id }}
              />
            )
          }
        )
      })
      .then(() => {
        form.reset()
        dispatch(closeDialogCreateSprint())
      })
      .catch((error) => {
        if (error.status === HttpStatusCode.UnprocessableEntity) {
          handleErrorApi({
            error: error,
            setError: form.setError
          })
          return
        }
        if (error.status === HttpStatusCode.Conflict) {
          toast.error(
            messages.component.sprint.template.dialog.toast.create.conflict
          )
          return
        }
        toast.error(
          messages.component.sprint.template.dialog.toast.create.failed
        )
      })
  }

  const handleUpdateSprint = (
    values: BaseSprintFormType,
    form: UseFormReturn<BaseSprintFormType>
  ) => {
    if (!dataSprint) return
    updateSprint({
      ...values,
      position: dataSprint.position,
      id: dataSprint.id
    })
      .unwrap()
      .then(({ id, title }) => {
        toast.success(
          messages.component.sprint.template.dialog.toast.update.success
            .message,
          {
            description: (
              <Message
                template={
                  messages.component.sprint.template.dialog.toast.update.success
                    .description
                }
                values={{ title: title, id: id }}
              />
            )
          }
        )
      })
      .then(() => {
        dispatch(closeDialogCreateSprint())
      })
      .catch((error) => {
        handleErrorApi({
          error: error,
          setError: form.setError
        })
        toast.error(
          messages.component.sprint.template.dialog.toast.update.failed
        )
      })
  }
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent aria-describedby={undefined} className='sm:max-w-[50vw]'>
        <DialogHeader>
          <DialogTitle>
            {messages.component.sprint.template.dialog.title}
          </DialogTitle>
        </DialogHeader>
        {mode === 'create' && (
          <SprintTemplateBaseForm
            onSubmit={(values, form) => {
              handleCreateSprint(values, form)
            }}
            submitText={
              messages.component.sprint.template.baseForm.submit.create
            }
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
              description: dataSprint.description,
              storyPoint: dataSprint.storyPoint
            }}
            onSubmit={(values, form) => {
              handleUpdateSprint(values, form)
            }}
            submitText={
              messages.component.sprint.template.baseForm.submit.update
            }
          />
        )}
      </DialogContent>
    </DialogController>
  )
}

export default SprintTemplateDialog
