import Editor from '@/components/Editor'
import Message from '@/components/Message'
import { Button } from '@/components/ui/button'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import messages from '@/constant/message.const'
import { useUpdateWorkspaceMutation } from '@/feature/workspace/workspace.api'
import {
  UpdateWorkspaceSchema,
  UpdateWorkspaceSchemaType,
  WorkspaceDetailResponse
} from '@/types/workspace.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type UpdateWorkspaceForm = {
  data: WorkspaceDetailResponse
}

const UpdateWorkspaceForm = ({ data }: UpdateWorkspaceForm) => {
  const [updateWorkspace] = useUpdateWorkspaceMutation()
  const navigate = useNavigate()
  const form = useForm<UpdateWorkspaceSchemaType>({
    resolver: zodResolver(UpdateWorkspaceSchema),
    defaultValues: {
      description: data.description,
      date: {
        from: new Date(data.start),
        to: new Date(data.end)
      }
    }
  })

  const handleSubmit = (values: UpdateWorkspaceSchemaType) => {
    updateWorkspace({
      workspaceId: data.id,
      payload: {
        description: values.description,
        end: values.date.to
      }
    })
      .unwrap()
      .then((response) =>
        toast.success(
          messages.component.updateWorkspace.toast.success.message,
          {
            description: (
              <Message
                template={
                  messages.component.updateWorkspace.toast.success.message
                }
                values={{
                  name: response.name,
                  id: response.id
                }}
              />
            )
          }
        )
      )
      .then(() => {
        navigate(`/manager/workspace/${data.id}`)
      })
      .catch(() => {
        toast.error(messages.component.updateWorkspace.toast.failed)
      })
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='rounded-md px-2 py-4 shadow-md'
        >
          <div className='[&>*:not(:first-element)]:mt-3'>
            <FormItem>
              <FormLabel>
                {messages.component.updateWorkspace.form.name}
              </FormLabel>
              <FormControl>
                <Input type='text' disabled value={data?.name} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className='flex gap-5 [&>*]:flex-1'>
              <FormItem className='mt-4'>
                <FormLabel>
                  {messages.component.updateWorkspace.form.dateStart}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    value={data.start && format(data.start, 'LLL dd, y')}
                  />
                </FormControl>
                <div className='h-[20px]'></div>
              </FormItem>

              <FormField
                control={form.control}
                name='date.to'
                render={({ field }) => (
                  <FormItem className='mt-4'>
                    <FormLabel>
                      {messages.component.updateWorkspace.form.dateEnd}
                    </FormLabel>
                    <DatePickerWithPresets
                      date={field.value}
                      setDate={(date) => {
                        if (date) {
                          field.onChange(new Date(date))
                        }
                      }}
                    />
                    <div className='h-[20px]'>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>
                    {messages.component.updateWorkspace.form.description}
                  </FormLabel>

                  <FormControl>
                    <Editor
                      {...field}
                      classNameContainer=' rounded-md border shadow-sm'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            className='mt-4 w-full'
            type='submit'
            loading={form.formState.isSubmitting}
          >
            {messages.component.updateWorkspace.form.submit}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UpdateWorkspaceForm
