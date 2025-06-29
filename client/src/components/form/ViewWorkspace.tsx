import HtmlViewer from '@/components/HtmlViewer'
import { Timeline, TimelineItem } from '@/components/timeline'
import ToolTip from '@/components/Tooltip'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'
import { WorkspaceDetailResponse } from '@/types/workspace.type'
import { Check } from 'lucide-react'
type ViewWorkspaceProps = {
  data: WorkspaceDetailResponse
}

const ViewWorkspace = ({ data }: ViewWorkspaceProps) => {
  const { currentSprint, nextSprint, prevSprint } = data
  return (
    <div className='flex rounded-md px-2 py-4 shadow-md'>
      <div className='flex-1 border-r-2 pr-4 [&>*:not(:first-element)]:mt-3'>
        <ToolTip trigger={<h3 className='h3'>{data.name}</h3>}>
          {data.id}
        </ToolTip>
        <Separator className='my-2' />
        <div className='flex items-center gap-2'>
          <h3 className=''>Total sprint</h3>
          <span className='rounded-xl bg-blue-500 px-4 py-2 text-white'>
            {data.sprintNum}
          </span>
        </div>
        <Separator className='my-2' />
        <ul className='flex items-center gap-4'>
          <span>Start</span>
          <span className='rounded-xl bg-green-500 px-4 py-2 text-white'>
            {formatDate(data.start)}
          </span>
          <span>Current </span>
          <span className='rounded-xl bg-amber-500 px-4 py-2 text-white'>
            {formatDate(new Date())}
          </span>
          <span>End </span>
          <span className='rounded-xl bg-red-500 px-4 py-2 text-white'>
            {formatDate(data.end)}
          </span>
        </ul>

        <Separator className='my-2' />
        <div>
          <h3 className='h3'>Description</h3>
          <HtmlViewer value={data.description} />
        </div>
      </div>
      <article className='px-2'>
        <h3 className='h3'>Timeline</h3>
        <Timeline size={'sm'} className='min-h-fit'>
          {nextSprint && (
            <TimelineItem
              date={formatDate(nextSprint.start)}
              title={nextSprint.title}
              description='Next sprint is planned'
              status='pending'
            />
          )}
          {currentSprint && (
            <TimelineItem
              date={formatDate(currentSprint.start)}
              title={currentSprint.title}
              description='Current sprint is in progress'
              status='in-progress'
            />
          )}

          {prevSprint && (
            <TimelineItem
              date={formatDate(prevSprint.end)}
              title={prevSprint.title}
              description='Previous sprint is completed'
              icon={<Check />}
              status='completed'
            />
          )}
        </Timeline>
      </article>
    </div>
  )
}

export default ViewWorkspace
