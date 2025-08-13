import HtmlViewer from '@/components/HtmlViewer'
import TitleLevel from '@/components/TitleLevel'
import ViewComment from '@/components/issue/viewFields/ViewComment'
import ViewRelationship from '@/components/issue/viewFields/ViewRelationship'
import ViewSubTask from '@/components/issue/viewFields/ViewSubTask'
import ViewTopic from '@/components/issue/viewFields/ViewTopic'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import messages, {
  getComplexOfDescriptionName,
  getPriorityDisplayName,
  getTagDisplayName
} from '@/constant/message.const'
import { formatDate, uuid } from '@/lib/utils'
import { IssueDetailResponse } from '@/types/issue.type'
import ViewAttachmentIssue from '@/components/issue/viewFields/ViewAttactment'
type ViewIssueProps = {
  data: IssueDetailResponse
}

const ViewIssue = ({ data }: ViewIssueProps) => {
  const message = messages.component.issue
  const {
    id,
    name,
    description,
    priority,
    complexOfDescription,
    tag,
    assignee,
    reviewer,
    subtasks,
    topics,
    dtEnd,
    dtStart,
    relations
  } = data
  return (
    <div>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={60} minSize={30}>
          <ScrollArea className='h-inherit h-[60vh] flex-1 [&>*:not(:first-element)]:mt-3'>
            <div className='mr-3'>
              <TitleLevel className='my-3' level={'lv-1'}>
                {name}
              </TitleLevel>
              <Separator className='my-2' />
              <div>
                <div className='flex justify-between'>
                  <TitleLevel className='mb-2' level={'lv-2'}>
                    {message.description}
                  </TitleLevel>
                  <span>
                    Độ khó: {getComplexOfDescriptionName(complexOfDescription)}
                  </span>
                </div>
                <HtmlViewer
                  value={description}
                  fallback={'Không có mô tả'}
                  className='rounded-xl border-2 border-gray-300 p-2'
                />
              </div>
              <Separator className='my-2' />
              <div>
                <ViewAttachmentIssue
                  data={data.resources?.map((item) => {
                    return {
                      url: item.url,
                      id: item.id,
                      extension: item.extension,
                      filename: item.name
                    }
                  })}
                />
              </div>
              <Separator className='my-2' />

              <ViewRelationship items={relations} />
              <Separator className='my-2' />
              <ViewSubTask
                items={
                  subtasks?.map((item) => ({
                    id: uuid(),
                    name: item.name,
                    checked: item.checked,
                    order: item.order.toString()
                  })) ?? []
                }
              />
              <Separator className='my-2' />
              <TitleLevel level={'lv-2'}>
                {message.update.form.comment}
              </TitleLevel>
              <ViewComment issueId={id} />
            </div>
            <ScrollBar />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={35}>
          <ScrollArea className='h-inherit basis-[550px] rounded-md px-4 py-2 [&>*:not(:first-child)]:mt-3'>
            <TitleLevel level={'lv-2'}>{message.update.form.info}</TitleLevel>
            <Separator className='my-4' />
            <div className='grid grid-cols-2 items-center gap-x-2 gap-y-3'>
              <div>{message.assignee}</div>
              <ToolTip trigger={<div>{assignee?.name}</div>}>
                {assignee?.uniId}
              </ToolTip>
              <div>{message.reviewer}</div>
              <ToolTip trigger={<div>{reviewer?.name}</div>}>
                {reviewer?.uniId}
              </ToolTip>

              <div>{message.update.form.duration}</div>
              <div>
                {dtStart && formatDate(dtStart, 'SHORT')}-{' '}
                {dtEnd && formatDate(dtEnd, 'SHORT')}
              </div>
              <div>{message.priority}</div>
              <Badge>{getPriorityDisplayName(priority)}</Badge>
              <div>{message.create.form.tag}</div>
              <Badge>{getTagDisplayName(tag)}</Badge>
            </div>
            <Separator className='my-4' />
            <ViewTopic
              items={
                topics?.map((item) => ({
                  id: item.id,
                  name: item.name
                })) ?? []
              }
            />

            <ScrollBar />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ViewIssue
