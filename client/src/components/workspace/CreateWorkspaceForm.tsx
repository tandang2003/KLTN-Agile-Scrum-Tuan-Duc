import Editor from '@/components/Editor'
import Message from '@/components/Message'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import messages from '@/constant/message.const'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { useGetAllCourseQuery } from '@/feature/course/course.api'
import { useCreateWorkspaceMutation } from '@/feature/workspace/workspace.api'
import { setStateDialogWorkspace } from '@/feature/workspace/workspace.slice'
import { handleErrorApi } from '@/lib/form'
import { cn, formatDate } from '@/lib/utils'
import {
  CreateWorkspaceSchema,
  CreateWorkspaceSchemaType
} from '@/types/workspace.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, format, startOfDay } from 'date-fns'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const CreateWorkspaceForm = () => {
  const { data: courses } = useGetAllCourseQuery()

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
    const start = format(startOfDay(values.date.from), 'yyyy-MM-dd')
    const end = format(startOfDay(values.date.to), 'yyyy-MM-dd')
    fetch('/api/workspace/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...values,
        start: start,
        end: end
      })
    })
    // createWorkspace({
    //   ...values,
    //   start: values.date.from,
    //   end: values.date.to
    // })
    //   .unwrap()
    //   .then((response) =>
    //     toast.success(
    //       messages.component.createWorkspace.toast.success.message,
    //       {
    //         description: (
    //           <Message
    //             template={
    //               messages.component.createWorkspace.toast.success.description
    //             }
    //             values={{ name: response.name, id: response.id }}
    //           />
    //         )
    //       }
    //     )
    //   )
    //   .then(() => {
    //     dispatch(setStateDialogWorkspace(!state))
    //   })
    //   .catch((error) => {
    //     toast.error(messages.component.createWorkspace.toast.failed)
    //     handleErrorApi(error)
    //   })
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? courses?.find((item) => item.id === field.value)
                                ?.name
                            : 'Chọn môn học'}
                          <ChevronsUpDown className='opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='p-0' align='start'>
                        <Command>
                          <CommandInput
                            placeholder='Chọn môn học...'
                            className='h-9'
                          />
                          <CommandList>
                            <CommandEmpty>Không tìm thấy môn học</CommandEmpty>
                            <CommandGroup>
                              {courses?.map((course) => (
                                <CommandItem
                                  value={course.name}
                                  key={course.id}
                                  onSelect={() => {
                                    field.onChange(course.id)
                                  }}
                                >
                                  {course.name}
                                  <Check
                                    className={cn(
                                      'ml-auto',
                                      course.name === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
