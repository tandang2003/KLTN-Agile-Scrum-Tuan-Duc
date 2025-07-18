import Editor from '@/components/Editor'
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
import { useUpdateWorkspaceMutation } from '@/feature/workspace/workspace.api'
import {
  UpdateWorkspaceSchema,
  UpdateWorkspaceSchemaType,
  WorkspaceResponse
} from '@/types/workspace.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type UpdateWorkspaceForm = {
  data: WorkspaceResponse
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
        toast.success('Update workspace successful', {
          description: `Workspace ${response.name} - #${response.id}`
        })
      )
      .then(() => {
        navigate(`/manager/workspace/${data.id}`)
      })
      .catch(() => {
        toast.error('Update workspace failed')
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' disabled value={data?.name} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className='flex gap-5 [&>*]:flex-1'>
              <FormItem className='mt-4'>
                <FormLabel>Time start</FormLabel>
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
                    <FormLabel>Time end</FormLabel>
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
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Editor
                      {...field}
                      classNameContainer='h-[200px] rounded-md border shadow-sm'
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
            Update
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UpdateWorkspaceForm
