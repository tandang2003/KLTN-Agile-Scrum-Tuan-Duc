import SectionComment from '@/components/issue/comment/SectionComment'
import { UpdateAttachmentIssue } from '@/components/issue/updateFields/UpdateAttachmentIssue'
import UpdateDateIssue from '@/components/issue/updateFields/UpdateDateIssue'
import UpdateDescriptionIssue from '@/components/issue/updateFields/UpdateDescriptionIssue'
import UpdateMemberIssue from '@/components/issue/updateFields/UpdateMemberIssue'
import UpdateNameIssue from '@/components/issue/updateFields/UpdateNameIssue'
import UpdatePriorityIssue from '@/components/issue/updateFields/UpdatePriorityIssue'
import UpdateRelationship from '@/components/issue/updateFields/UpdateRelationship'
import UpdateSubTaskForm from '@/components/issue/updateFields/UpdateSubTaskIssue'
import UpdateTopicForm from '@/components/issue/updateFields/UpdateTopicIssue'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import messages from '@/constant/message.const'
import {
  IssueDetailResponse,
  UpdateIssueSchema,
  UpdateIssueType
} from '@/types/issue.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
type UpdateIssueFormProps = {
  data: IssueDetailResponse
}

const UpdateIssueForm = ({ data }: UpdateIssueFormProps) => {
  const message = messages.component.issue

  const form = useForm<UpdateIssueType>({
    resolver: zodResolver(UpdateIssueSchema),
    defaultValues: {
      ...data,
      id: data.id,
      name: data.name,
      description: data.description,
      priority: data.priority,
      subtasks:
        data?.subtasks?.map((item) => {
          return {
            name: item.name,
            order: item.order,
            checked: item.checked
          }
        }) ?? [],
      assigneeId: data?.assignee?.uniId,
      reviewerId: data?.reviewer?.uniId,
      topics: data.topics?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color
        }
      }),
      date: {
        from: data.dtStart,
        to: data.dtEnd
      }
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

  return (
    <Form {...form}>
      <form className='flex h-[60vh] gap-3'>
        <ScrollArea className='h-inherit flex-1 [&>*:not(:first-element)]:mt-3'>
          <div className='mr-3'>
            <div className='my-3'>
              <UpdateNameIssue />
            </div>

            <div className='my-3'>
              <Label className='mb-2 text-xl'>{message.description}</Label>
              <UpdateDescriptionIssue />
            </div>
            <div>
              <UpdateAttachmentIssue
                issueId={data.id}
                data={data.resources?.map((item) => {
                  return {
                    filename: item.name,
                    url: item.url,
                    id: item.id,
                    extension: item.extension
                  }
                })}
              />
            </div>
            <UpdateSubTaskForm />
            <UpdateRelationship
              issueId={data.id}
              initialData={data.relations}
            />
            <Tabs defaultValue='comment' className='mt-3'>
              <TabsList>
                <TabsTrigger value='comment'>
                  {message.update.form.comment}
                </TabsTrigger>
              </TabsList>
              <TabsContent value='comment'>
                <SectionComment />
              </TabsContent>
            </Tabs>
          </div>
          <ScrollBar />
        </ScrollArea>
        <ScrollArea className='h-inherit basis-[550px] rounded-md border-2 px-4 py-2 [&>*:not(:first-child)]:mt-3'>
          <p className='text-xl'>{message.update.form.detail}</p>

          <div className='grid grid-cols-2 items-center gap-x-2 gap-y-3'>
            <div>{message.assignee}</div>
            <UpdateMemberIssue form={form} name='assigneeId' />
            <div>{message.reviewer}</div>
            <UpdateMemberIssue form={form} name='reviewerId' />

            <div>{message.update.form.duration}</div>
            <UpdateDateIssue />
            <div>{message.priority}</div>
            <UpdatePriorityIssue />
          </div>
          <div className='mt-4 flex items-center gap-2'>
            <UpdateTopicForm />
          </div>

          <ScrollBar />
        </ScrollArea>
      </form>
    </Form>
  )
}

export default UpdateIssueForm
