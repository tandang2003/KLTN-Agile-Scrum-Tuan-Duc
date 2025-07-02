import HtmlViewer from '@/components/HtmlViewer'
import ToolTip from '@/components/Tooltip'
import { Separator } from '@/components/ui/separator'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import { cn, formatDate } from '@/lib/utils'
import { WorkspaceDetailResponse } from '@/types/workspace.type'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle
} from '@/components/ui/timeline'
import Icon from '@/components/Icon'
import { isAfter, isBefore } from 'date-fns'
import messages from '@/constant/message.const'

type ViewWorkspaceProps = {
  data: WorkspaceDetailResponse
}

const ViewWorkspace = ({ data }: ViewWorkspaceProps) => {
  const { currentSprint, nextSprint, prevSprint } = data
  const { data: sprints } = useGetListSprintQuery(data.id, {
    skip: !data.id
  })
  return (
    <div className='px-2 py-4 shadow-md'>
      <div className='flex rounded-md'>
        <div className='flex-1 [&>*:not(:first-element)]:mt-3'>
          <ToolTip trigger={<h3 className='h3'>{data.name}</h3>}>
            {data.id}
          </ToolTip>
          <Separator className='my-2' />
          <div className='flex py-2'>
            <div className='flex items-center gap-2'>
              <h3>{messages.component.viewWorkspace.totalSprint}</h3>
              <span className='rounded-xl bg-blue-500 px-4 py-2 text-white'>
                {data.sprintNum}
              </span>
            </div>
            <Separator orientation='vertical' className='mx-2' />

            <div className='flex items-center gap-2'>
              <h3>{messages.component.viewWorkspace.course}</h3>
              <ToolTip
                trigger={
                  <span className='rounded-xl bg-blue-500 px-4 py-2 text-white'>
                    {data.course.name}
                  </span>
                }
              >
                {data.course.id}
              </ToolTip>
            </div>
          </div>
          <Separator className='my-2' />
          <ul className='flex items-center gap-4'>
            <span>{messages.component.viewWorkspace.start}</span>
            <span className='rounded-xl bg-green-500 px-4 py-2 text-white'>
              {formatDate(data.start)}
            </span>

            <span>{messages.component.viewWorkspace.end}</span>
            <span className='rounded-xl bg-red-500 px-4 py-2 text-white'>
              {formatDate(data.end)}
            </span>
          </ul>

          <Separator className='my-2' />
          <div>
            <h3 className='h3'>
              {messages.component.viewWorkspace.description.title}
            </h3>
            <HtmlViewer
              value={data.description}
              fallback={messages.component.viewWorkspace.description.fallback}
            />
          </div>
        </div>
      </div>
      <Separator className='my-2' />
      <div>
        <h3 className='h3'>
          {messages.component.viewWorkspace.timeline.title}
        </h3>
        <div>
          <Timeline orientation='horizontal' className='min-h-40'>
            {sprints?.map((item, index) => {
              return (
                <TimelineItem
                  key={item.id}
                  className={cn(
                    index % 2 === 0 ? 'before:flex-1' : 'after:flex-1'
                  )}
                >
                  {index % 2 === 0 && (
                    <TimelineSeparator>
                      {currentSprint?.id === item.id ? (
                        <Icon icon={'tabler:current-location'} size={40} />
                      ) : currentSprint &&
                        isAfter(currentSprint.start, item.end) ? (
                        <Icon icon={'mdi:success'} className='text-green-500' />
                      ) : (
                        <Icon icon={'line-md:loading-loop'} />
                      )}

                      {index !== sprints.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                  )}
                  <TimelineContent>
                    <ToolTip
                      trigger={
                        <TimelineTitle className='line-clamp-1'>
                          {item.title}
                        </TimelineTitle>
                      }
                    >
                      <span className='font-semibold'>{item.title}</span>
                    </ToolTip>
                    <TimelineDescription className='whitespace-nowrap'>
                      {formatDate(item.start)} - {formatDate(item.end)}
                    </TimelineDescription>
                  </TimelineContent>

                  {index % 2 === 1 && (
                    <TimelineSeparator>
                      {currentSprint?.id === item.id ? (
                        <Icon icon={'tabler:current-location'} size={40} />
                      ) : currentSprint &&
                        isAfter(currentSprint.start, item.end) ? (
                        <Icon icon={'mdi:success'} className='text-green-500' />
                      ) : (
                        <Icon icon={'line-md:loading-loop'} />
                      )}
                      {index !== sprints.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                  )}
                </TimelineItem>
              )
            })}
          </Timeline>
        </div>
      </div>
    </div>
  )
}

export default ViewWorkspace
