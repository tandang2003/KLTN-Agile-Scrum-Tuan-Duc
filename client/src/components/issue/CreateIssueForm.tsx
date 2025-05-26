import Editor from '@/components/Editor'
import SelectMember from '@/components/issue/SelectMember'
import SelectSprint from '@/components/issue/SelectSprint'
import CreateSubTaskForm from '@/components/issue/subTasks/CreateSubTaskForm'
import CreateTopicForm from '@/components/issue/topic/CreateTopicForm'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import { useCreateIssueMutation } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import issueService from '@/services/issue.service'
import {
  BaseIssueFormType,
  BaseIssueSchema,
  CreateIssueRequest,
  CreateIssueType
} from '@/types/issue.type'
import { issuePriorityList, issueTagList } from '@/types/model/typeOf'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
type CreateIssueFormProps = {
  onSubmit?: () => void
}

const CreateIssueForm = ({ onSubmit }: CreateIssueFormProps) => {
  const sprintCurrent = useAppSelector(
    (state: RootState) => state.sprintSlice.current
  )

  const [create] = useCreateIssueMutation()
  const form = useForm<BaseIssueFormType>({
    resolver: zodResolver(BaseIssueSchema),
    defaultValues: {
      sprintId: sprintCurrent?.id
    }
  })

  const { projectId } = useAppId()

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log('❌ Form Errors:', form.formState.errors)

      // Optional: log each field error
      Object.entries(form.formState.errors).forEach(([fieldName, error]) => {
        console.log(`Field "${fieldName}" has error:`, error?.message)
      })
    }
  }, [form.formState.errors])

  const handleSubmit = (values: CreateIssueType) => {
    if (!projectId) return
    const req: CreateIssueRequest = {
      projectId: projectId,
      sprintId: sprintCurrent?.id,
      ...values
    }
    create(req)
      .unwrap()
      .then((response) => {
        toast.success('Create issue success', {
          description: `Issue - ${response.name}`
        })
      })
      .catch((_) => toast.error('Create issue failed'))
      .finally(() => {
        onSubmit?.()
      })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='flex gap-3'>
          <div className='flex-1 [&>*:not(:first-element)]:mt-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='2113xxxx' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <CreateSubTaskForm />
          </div>
          <div className='basis-[450px] [&>*:not(:first-child)]:mt-3'>
            <div className='flex gap-3'>
              <FormField
                control={form.control}
                name='start'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Time start</FormLabel>
                    <DatePickerWithPresets
                      min={
                        sprintCurrent?.start
                          ? new Date(sprintCurrent.start)
                          : undefined
                      }
                      max={
                        sprintCurrent?.end
                          ? new Date(sprintCurrent.end)
                          : undefined
                      }
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

              <FormField
                control={form.control}
                name='end'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Time end</FormLabel>
                    <DatePickerWithPresets
                      date={field.value}
                      min={
                        sprintCurrent?.start
                          ? new Date(sprintCurrent.start)
                          : undefined
                      }
                      max={
                        sprintCurrent?.end
                          ? new Date(sprintCurrent.end)
                          : undefined
                      }
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
            <div className='grid grid-cols-2 grid-rows-2 gap-3'>
              <FormField
                control={form.control}
                name='priority'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a priority' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {issuePriorityList.map((item, index) => {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tag'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a tag' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {issueTagList.map((item, index) => {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SelectMember
                control={form.control}
                name='assigneeId'
                label='Assignee'
              />
              <SelectMember
                control={form.control}
                name='reviewerId'
                label='Reviewer'
              />
            </div>
            <SelectSprint
              control={form.control}
              name='sprintId'
              label='Sprint'
            />
            <CreateTopicForm />
          </div>
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
  )
}

export default CreateIssueForm
