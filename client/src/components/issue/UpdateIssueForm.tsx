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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth'
import TitleLevel from '@/components/TitleLevel'
import RoundedLabel from '@/components/issue/RoundedLabel'

type UpdateIssueFormProps = {
  data: IssueDetailResponse
}

const UpdateIssueForm = ({ data }: UpdateIssueFormProps) => {
  const message = messages.component.issue
  const { user } = useAuth()

  const isLeader = user?.uniId === data.leader
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
      <form>
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={60} minSize={30}>
            <ScrollArea className='h-inherit h-[60vh] flex-1 [&>*:not(:first-element)]:mt-3'>
              <div className='mr-3'>
                <UpdateNameIssue />

                <Separator className='my-3' />
                <UpdateDescriptionIssue />

                <Separator className='my-3' />
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
                <Separator className='my-3' />
                <UpdateSubTaskForm />
                <Separator className='my-3' />
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
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={35}>
            <ScrollArea className='h-inherit basis-[550px] rounded-md px-4 [&>*:not(:first-child)]:mt-3'>
              <TitleLevel level={'lv-2'}>{message.update.form.info}</TitleLevel>
              <Separator className='my-2' />
              <div className='space-y-2'>
                <RoundedLabel
                  label={<span className='flex-1'>{message.assignee}</span>}
                >
                  {isLeader ? (
                    <div className={'flex-1'}>
                      <UpdateMemberIssue form={form} name='assigneeId' />
                    </div>
                  ) : (
                    <span>{data.assignee?.name ?? 'Chưa đựợc gán'}</span>
                  )}
                </RoundedLabel>

                <RoundedLabel
                  label={<span className='flex-1'>{message.reviewer}</span>}
                >
                  {isLeader ? (
                    <div className={'flex-1'}>
                      <UpdateMemberIssue form={form} name='reviewerId' />
                    </div>
                  ) : (
                    <span>{data.reviewer?.name ?? 'Chưa đựợc gán'}</span>
                  )}
                </RoundedLabel>
                <RoundedLabel
                  className='items-center gap-3'
                  label={
                    <span className='flex-1/3'>
                      {message.update.form.duration}
                    </span>
                  }
                >
                  <UpdateDateIssue />
                </RoundedLabel>
                <RoundedLabel
                  className='items-center'
                  label={<span className='flex-1'>{message.priority}</span>}
                >
                  <div className='flex-1'>
                    <UpdatePriorityIssue />
                  </div>
                </RoundedLabel>
              </div>
              <div className='mt-4 flex items-center gap-2'>
                <UpdateTopicForm />
              </div>

              <ScrollBar />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </form>
    </Form>
  )
}

export default UpdateIssueForm
