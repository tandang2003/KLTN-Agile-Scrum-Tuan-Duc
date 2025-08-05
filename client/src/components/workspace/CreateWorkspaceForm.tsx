import SelectCourse from '@/components/course/SelectCourse'
import Editor from '@/components/Editor'
import Message from '@/components/Message'
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
import messages from '@/constant/message.const'
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
      },
      courseId: ''
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
        toast.success(
          messages.component.createWorkspace.toast.success.message,
          {
            description: (
              <Message
                template={
                  messages.component.createWorkspace.toast.success.description
                }
                values={{ name: response.name, id: response.id }}
              />
            )
          }
        )
      )
      .then(() => {
        dispatch(setStateDialogWorkspace(!state))
      })
      .catch((error) => {
        toast.error(messages.component.createWorkspace.toast.failed)
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
                  <FormLabel>
                    {messages.component.createWorkspace.form.name}
                  </FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Lập trình Web' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='mt-4 flex gap-5 [&>*]:flex-1'>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {messages.component.createWorkspace.form.dateStart} -
                      {messages.component.createWorkspace.form.dateEnd}
                    </FormLabel>
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

              <FormField
                name={'courseId'}
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      {messages.component.createWorkspace.form.course}
                    </FormLabel>
                    <SelectCourse
                      setValue={field.onChange}
                      value={field.value}
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
                <FormItem>
                  <FormLabel>
                    {messages.component.createWorkspace.form.description}
                  </FormLabel>

                  <FormControl>
                    <Editor
                      className='h-full'
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
            {messages.component.createWorkspace.form.submit}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateWorkspaceForm
