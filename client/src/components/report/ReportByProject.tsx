import {
  DocViewerContent,
  DocViewerRoot,
  DocViewerTrigger,
  FullScreenDocViewer
} from '@/components/DocViewer'
import Icon from '@/components/Icon'
import ReportSprintSheetTeacher from '@/components/report/ReportSprintSheetTeacher'
import messages from '@/constant/message.const'
import { Id } from '@/types/other.type'
import { ResourceOfSprintResponseType } from '@/types/resource.type'
import { ComponentProps } from 'react'

type Props = {
  projectId: Id
} & ComponentProps<typeof ReportSprintSheetTeacher>

const ReportByProject = ({ projectId, isOpen, onOpenChange }: Props) => {
  return (
    <ReportSprintSheetTeacher isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className='mt-4'>
        {/* <LoadingBoundary<ProjectResourceResponseType>>
          {(data) => {
            return data.map((item) => {
              return (
                <RowData
                  data={{
                    daily: item.daily,
                    fileBacklog: item.fileBacklog
                  }}
                />
              )
            })
          }}
        </LoadingBoundary> */}

        <DocViewerRoot>
          <div className='space-x-4 p-8'>
            <DocViewerTrigger document='https://res.cloudinary.com/yourstyle/image/upload/v1750148113/KLTN/5036e7c6-0539-4365-a678-dfdcc8605552/_report/21130320/sgcWebSocketApps_wlehw8.pdf'>
              <button className='rounded bg-blue-600 px-4 py-2 text-white'>
                Open Guide
              </button>
            </DocViewerTrigger>

            <DocViewerTrigger document=''>
              <button className='rounded bg-green-600 px-4 py-2 text-white'>
                Open Manual
              </button>
            </DocViewerTrigger>
          </div>

          <DocViewerContent />
        </DocViewerRoot>
      </div>
    </ReportSprintSheetTeacher>
  )
}

type RowDataProps = {
  data: ResourceOfSprintResponseType
}

const RowData = ({ data }: RowDataProps) => {
  const message = messages.component.reportSprintSheet
  return (
    <div>
      <div>
        <h4 className='mb-3 text-base font-semibold'>
          {message.form.daily1.label}
        </h4>
        <div className='hover:bg-accent/30 focus-visible:border-ring/50 data-[dragging]:border-primary/30 data-[invalid]:border-destructive data-[dragging]:bg-accent/30 data-[invalid]:ring-destructive/20 relative flex items-center justify-start gap-2 rounded-lg border-2 border-dashed p-6 transition-colors outline-none select-none data-[disabled]:pointer-events-none'>
          <div className='flex size-[50px] items-center justify-center shadow-md'>
            <Icon icon={'mingcute:doc-line'} size={50} />
          </div>
          <div className='flex flex-1 flex-col gap-1'>
            <span className='line-clamp-1 w-[200px] text-base'>
              {data.daily?.[0].name}
            </span>
          </div>
        </div>
      </div>
      <div>
        <h4 className='mb-3 text-base font-semibold'>
          {message.form.daily2.label}
        </h4>
      </div>
      <div className='col-span-2'>
        <h4 className='mb-3 text-base font-semibold'>
          {message.form.backlog.label}
        </h4>
      </div>
    </div>
  )
}

export default ReportByProject
