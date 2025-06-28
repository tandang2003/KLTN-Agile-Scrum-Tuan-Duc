import Editor from '@/components/Editor'
import SelectEnum from '@/components/issue/SelectEnum'
import SelectMember from '@/components/issue/SelectMember'
import SelectSprint from '@/components/issue/createFields/SelectSprint'
import CreateDateIssueForm from '@/components/issue/createFields/CreateDateIssueForm'
import CreateSubTaskForm from '@/components/issue/createFields/CreateSubTaskForm'
import CreateTopicForm from '@/components/issue/createFields/CreateTopicForm'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useCreateIssueMutation } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import {
  CreateIssueRequest,
  CreateIssueSchema,
  CreateIssueType
} from '@/types/issue.type'
import { issuePriorityList, issueTagList } from '@/types/model/typeOf'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEffect } from 'react'
import boardService from '@/services/board.service'
import { DEFAULT_STATUS } from '@/lib/const'
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
