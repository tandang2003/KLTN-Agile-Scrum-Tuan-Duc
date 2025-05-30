import Icon from '@/components/Icon'
import SelectMember from '@/components/issue/SelectMember'
import UpdateDateIssue from '@/components/issue/updateFields/UpdateDateIssue'
import UpdateDescriptionIssue from '@/components/issue/updateFields/UpdateDescriptionIssue'
import UpdateNameIssue from '@/components/issue/updateFields/UpdateNameIssue'
import UpdatePriorityIssue from '@/components/issue/updateFields/UpdatePriorityIssue'
import UpdateSubTaskForm from '@/components/issue/updateFields/UpdateSubTaskIssue'
import UpdateTagIssue from '@/components/issue/updateFields/UpdateTagIssue'
import UpdateTopicForm from '@/components/issue/updateFields/UpdateTopicIssue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  IssueDetailResponse,
  UpdateIssueSchema,
  UpdateIssueType
} from '@/types/issue.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
type UpdateIssueFormProps = {
  data: IssueDetailResponse
}

const UpdateIssueForm = ({ data }: UpdateIssueFormProps) => {
  const form = useForm<UpdateIssueType>({
    resolver: zodResolver(UpdateIssueSchema),
    defaultValues: {
      ...data,
      id: data.id,
      subTasks: data.subTasks ?? [],
      date: {
        from: data.start,
        to: data.end
      }
    }
  })
  const { control } = form

  return (
    <Form {...form}>
      <form className='flex h-[60vh] gap-3'>
        <ScrollArea className='h-inherit flex-1 [&>*:not(:first-element)]:mt-3'>
          <div className='my-3'>
            <UpdateNameIssue />
          </div>
          <div className='my-3'>
            <Label className='mb-2 text-xl font-bold'>Description</Label>
            <UpdateDescriptionIssue />
          </div>
          <div>
            <Button type='button' variant={'outline'}>
              <Icon icon={'ic:baseline-plus'} />
              Add attachments
            </Button>
          </div>
          <UpdateSubTaskForm />
          <Tabs defaultValue='comment' className='mt-3'>
            <TabsList>
              <TabsTrigger value='comment'>Comment</TabsTrigger>
              <TabsTrigger value='history'>History</TabsTrigger>
            </TabsList>
            <TabsContent value='comment'>comment</TabsContent>
            <TabsContent value='history'>history</TabsContent>
          </Tabs>
          <ScrollBar />
        </ScrollArea>
        <ScrollArea className='h-inherit basis-[550px] rounded-md border-2 px-4 py-2 [&>*:not(:first-child)]:mt-3'>
          <p className='text-xl'> Detail</p>

          <div className='grid grid-cols-2 items-center gap-x-2 gap-y-3'>
            <div>Assignee</div>
            <SelectMember control={control} name='assigneeId' />
            <div>Reviewer</div>
            <SelectMember control={control} name='reviewId' />
            <div>Story point estimate</div>
            <Badge>{data.storyPoint}</Badge>
            <div>Duration</div>
            <UpdateDateIssue />
            <div>Priority</div>
            <UpdatePriorityIssue />

            <div>Tag</div>
            <UpdateTagIssue />
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
