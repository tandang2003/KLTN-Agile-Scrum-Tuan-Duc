import Editor from '@/components/Editor'
import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { useCreateWorkspaceMutation } from '@/feature/workspace/workspace.api'
import { setStateDialogWorkspace } from '@/feature/workspace/workspace.slice'
import { handleErrorApi } from '@/lib/form'
import {
  CreateWorkspaceSchema,
  CreateWorkspaceSchemaType
} from '@/types/workspace.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const CreateWorkspaceForm = () => {
  const [createWorkspace] = useCreateWorkspaceMutation()
  const state = useAppSelector(
    (state: RootState) => state.workspaceSlice.isDialogCreateOpen
  )
  const dispatch = useAppDispatch()

  const form = useForm<CreateWorkspaceSchemaType>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      name: '',
      description: '',
      date: {
        from: new Date(),
        to: addDays(new Date(), 20)
      }
    }
  })

  const handleSubmit = (values: CreateWorkspaceSchemaType) => {
    createWorkspace({
      ...values,
      start: values.date.from,
      end: values.date.to
    })
      .unwrap()
      .then((response) =>
        toast.success('Create workspace successful', {
          description: `Workspace #${response.id} - ${response.name}`
        })
      )
      .then(() => {
        dispatch(setStateDialogWorkspace(!state))
      })
      .catch((error) => {
        toast.error('Create workspace failed')
        handleErrorApi(error)
      })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='[&>*:not(:first-element)]:mt-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='2113xxxx' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex gap-5 [&>*]:flex-1'>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='mt-4'>
                    <FormLabel>Time start - end</FormLabel>
                    <DatePickerWithRange
                      date={{
                        from: field.value.from,
                        to: field.value.to
                      }}
                      setDate={field.onChange}
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
            Create
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateWorkspaceForm
