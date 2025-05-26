import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import Editor from '@/components/Editor'
import HtmlViewer from '@/components/HtmlViewer'
import Icon from '@/components/Icon'
import InlineEdit from '@/components/InlineEdit'
import SelectMember from '@/components/issue/SelectMember'
import UpdateSubTaskForm from '@/components/issue/subTasks/UpdateSubTaskForm'
import UpdateTopicForm from '@/components/issue/topic/UpdateTopicForm'
import LoadingBoundary from '@/components/LoadingBoundary'
import ToolTip from '@/components/Tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppSelector } from '@/context/redux/hook'
import { RootState } from '@/context/redux/store'
import {
  useGetIssueQuery,
  useUpdateIssueMutation
} from '@/feature/issue/issue.api'
import { useAutoUpdateField } from '@/hooks/use-update'
import { formatDateRange } from '@/lib/date'
import {
  BaseIssueFormType,
  BaseIssueSchema,
  IssueDetailResponse
} from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

type DialogUpdateIssueProps = {} & DialogControllerProps

const DialogUpdateIssue = ({ open, onOpen }: DialogUpdateIssueProps) => {
  const id = useAppSelector((state: RootState) => state.issueSlice.current?.id)
  const { data, isFetching } = useGetIssueQuery(id as Id, {
    skip: !id
  })
  const [update] = useUpdateIssueMutation()
  const form = useForm<BaseIssueFormType>({
    resolver: zodResolver(BaseIssueSchema),
    defaultValues: data
  })

  const { control, setValue } = form

  useAutoUpdateField({
    control: control,
    field: 'name',
    id: data?.id,
    enabled: !!data,
    onSuccess: (res) => {
      console.log('Successfully updated name')
      toast.success('Name updated')
    },
    onError: (err) => {
      toast.error('Failed to update name')
    }
  })

  const description = useWatch({
    control: control,
    name: 'description'
  })

  useEffect(() => {
    if (data) {
      update({
        id: data.id,
        description: description,
        fieldChanging: 'description'
      })
        .unwrap()
        .then((response) => {
          console.log(response)
        })
        .catch((err) => console.log(err))
    }
  }, [description])

  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[80vw]' close={''}>
        <LoadingBoundary<IssueDetailResponse>
          data={data}
          isLoading={isFetching}
          fallback={<div>Not result</div>}
        >
          {(data) => (
            <>
              <DialogHeader>
                <DialogTitle className='flex items-center justify-between gap-3'>
                  <ToolTip
                    trigger={
                      <span className='w-[100px] truncate rounded-md bg-gray-400 p-2 shadow-md'>
                        #{data.id}
                      </span>
                    }
                  >
                    {data.id}
                  </ToolTip>
                  <DialogClose asChild>
                    <Button
                      type='button'
                      variant='secondary'
                      className='p-2 hover:bg-red-600 hover:text-white'
                    >
                      <Icon icon={'iconoir:xmark'} />
                    </Button>
                  </DialogClose>
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form className='flex h-[60vh] gap-3'>
                  <ScrollArea className='h-inherit flex-1 [&>*:not(:first-element)]:mt-3'>
                    <InlineEdit<string>
                      value={data.name}
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

                    <div className='my-3'>
                      <Label className='mb-2 text-xl font-bold'>
                        Description
                      </Label>
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
                            onChange={(_, __, ___, editor) =>
                              onChange(editor.getHTML())
                            }
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
                  <ScrollArea className='h-inherit basis-[350px] rounded-md border-2 px-4 py-2 [&>*:not(:first-child)]:mt-3'>
                    <Accordion type='single' collapsible defaultValue='detail'>
                      <AccordionItem value='detail'>
                        <AccordionTrigger className='pt-0 text-xl'>
                          Detail
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className='grid grid-cols-2 items-center gap-x-2 gap-y-3'>
                            <div>Assignee</div>
                            <SelectMember control={control} name='assigneeId' />
                            <div>Reviewer</div>
                            <SelectMember control={control} name='reviewId' />
                            <div>Story point estimate</div>
                            <Badge>{data.storyPoint}</Badge>
                            <div>Duration</div>
                            <div>
                              {formatDateRange(data.dtStart, data.dtEnd)}
                            </div>
                            <div>Priority</div>
                            <Badge>{data.priority}</Badge>
                            <div>Status</div>
                            <Badge
                              className='inline-block'
                              status={data.status}
                            >
                              {data.status}
                            </Badge>
                            <div>Tag</div>
                            <Badge className='inline-block'>{data.tag}</Badge>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value='subTasks'>
                        <AccordionTrigger className='text-xl'>
                          Sub tasks
                        </AccordionTrigger>
                        <AccordionContent>
                          <UpdateSubTaskForm />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value='topics'>
                        <AccordionTrigger className='text-xl'>
                          Topic
                        </AccordionTrigger>
                        <AccordionContent>
                          <UpdateTopicForm />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <ScrollBar />
                  </ScrollArea>
                </form>
              </Form>
            </>
          )}
        </LoadingBoundary>
      </DialogContent>
    </DialogController>
  )
}

export default DialogUpdateIssue
