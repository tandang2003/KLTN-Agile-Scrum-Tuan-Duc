import Editor from '@/components/Editor'
import SelectEnum from '@/components/issue/SelectEnum'
import SelectMember from '@/components/issue/SelectMember'
import CreateDateIssueForm from '@/components/issue/createFields/CreateDateIssueForm'
import CreateSubTaskForm from '@/components/issue/createFields/CreateSubTaskForm'
import CreateTopicForm from '@/components/issue/createFields/CreateTopicForm'
import SelectSprint from '@/components/issue/createFields/SelectSprint'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateIssueMutation } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import { DEFAULT_STATUS } from '@/constant/app.const'
import boardService from '@/services/board.service'
import {
  CreateIssueRequest,
  CreateIssueSchema,
  CreateIssueType
} from '@/types/issue.type'
import { issuePriorityList, issueTagList } from '@/types/model/typeOf'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
type CreateIssueFormProps = {
  onSubmit?: () => void
  sprint?: CreateIssueType['sprint']
}

const CreateIssueForm = ({ onSubmit, sprint }: CreateIssueFormProps) => {
  const { projectId } = useAppId()
  const [create] = useCreateIssueMutation()

  const form = useForm<CreateIssueType>({
    resolver: zodResolver(CreateIssueSchema),
    defaultValues: {
      priority: 'CRITICAL',
      tag: 'THEORY',
      date: undefined,
      position: null,
      sprint: sprint,
      sprintId: sprint?.id
    }
  })

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
      ...values,
      status: DEFAULT_STATUS
    }
    create(req)
      .unwrap()
      .then((response) => {
        toast.success('Create issue success', {
          description: `Issue - ${response.name}`
        })
        // Update position if available
        if (req.sprintId) {
          boardService.saveNewPosition({
            projectId: projectId,
            sprintId: req.sprintId,
            issueId: response.id,
            status: response.status
          })
        }
      })
      .catch(() => toast.error('Create issue failed'))
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
                    <Input type='text' placeholder='Solve Problem' {...field} />
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
                      className='h-full'
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
            <SelectSprint />
            <div className='flex gap-3'>
              <CreateDateIssueForm />
            </div>
            <div className='grid grid-cols-2 grid-rows-2 gap-3'>
              <SelectEnum
                control={form.control}
                name='priority'
                label='Priority'
                data={issuePriorityList}
              />
              <SelectEnum
                control={form.control}
                name='tag'
                label='Tag'
                data={issueTagList}
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
