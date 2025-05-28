import Editor from '@/components/Editor'
import HtmlViewer from '@/components/HtmlViewer'
import Icon from '@/components/Icon'
import InlineEdit from '@/components/InlineEdit'
import SelectMember from '@/components/issue/SelectMember'
import UpdateSubTaskForm from '@/components/issue/subTasks/UpdateSubTaskForm'
import UpdateTopicForm from '@/components/issue/topic/UpdateTopicForm'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import { Form, FormControl, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAutoUpdateField } from '@/hooks/use-update'
import {
  IssueDetailResponse,
  UpdateIssueSchema,
  UpdateIssueType
} from '@/types/issue.type'
import {
  issuePriorityList,
  issueStatusList,
  issueTagList
} from '@/types/model/typeOf'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
type UpdateIssueFormProps = {
  data: IssueDetailResponse
}

const UpdateIssueForm = ({ data }: UpdateIssueFormProps) => {
  const form = useForm<UpdateIssueType>({
    resolver: zodResolver(UpdateIssueSchema),
    defaultValues: {
      ...data,
      subTasks: data.subTasks ?? [],
      date: {
        from: data.start,
        to: data.end
      }
    }
  })
  const { control, setValue } = form

  useAutoUpdateField({
    form: form,
    field: 'name',
    onSuccess: (res) => {
      console.log('Successfully updated name', res)
      toast.success('name updated')
    },
    onError: (err) => {
      toast.error('Failed to update name')
    }
  })

  useAutoUpdateField({
    form: form,
    field: 'description',
    onSuccess: (res) => {
      console.log('Successfully updated description', res)
      toast.success('description updated')
    },
    onError: (err) => {
      toast.error('Failed to update name')
    }
  })

  useAutoUpdateField({
    form: form,
    field: 'date',
    onSuccess: (res) => {
      console.log('Successfully updated date', res)
      toast.success('date updated')
    },
    onError: (err) => {
      toast.error('Failed to update name')
    }
  })

  return (
    <Form {...form}>
      <form className='flex h-[60vh] gap-3'>
        <ScrollArea className='h-inherit flex-1 [&>*:not(:first-element)]:mt-3'>
          <div className='my-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => {
                return (
                  <InlineEdit<string | undefined>
                    value={field.value}
                    onSave={(val) => {
                      setValue('name', val, { shouldValidate: true })
                    }}
                    displayComponent={(value) => (
                      <h1 className='text-2xl'>{value}</h1>
                    )}
                    renderEditor={({
                      value,
                      onChange,
                      onBlur,
                      ref,
                      onKeyDown
                    }) => (
                      <Input
                        ref={ref}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        className='placeholder:text-xl'
                      />
                    )}
                  />
                )
              }}
            />
          </div>
          <div className='my-3'>
            <Label className='mb-2 text-xl font-bold'>Description</Label>
            <InlineEdit<string>
              value={data.description}
              onSave={(val) => {
                setValue('description', val)
              }}
              className='block'
              displayComponent={(value) => {
                return (
                  <HtmlViewer
                    className='rounded-md border-2 px-2 py-3 text-base'
                    value={value}
                    fallback={'Add a description...'}
                  />
                )
              }}
              renderEditor={({ value, onChange, onBlur, ref }) => (
                <Editor
                  value={value}
                  ref={ref}
                  onChange={(_, __, ___, editor) => onChange(editor.getHTML())}
                  onBlur={onBlur}
                />
              )}
            />
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
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => {
                return (
                  <DatePickerWithRange
                    date={field.value}
                    setDate={field.onChange}
                  />
                )
              }}
            />
            <div>Priority</div>
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => {
                return (
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
                )
              }}
            />

            <div>Status</div>
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => {
                return (
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
                      {issueStatusList.map((item, index) => {
                        return (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                )
              }}
            />

            <div>Tag</div>
            <div>
              <FormField
                control={form.control}
                name='tag'
                render={({ field }) => {
                  return (
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
                        {issueTagList.map((item, index) => {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  )
                }}
              />
            </div>
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
