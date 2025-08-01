import DocViewerTrigger, {
  DocViewerContent,
  DocViewerRoot
} from '@/components/DocViewer'
import Icon from '@/components/Icon'
import messages from '@/constant/message.const'
import {
  ResourceOfSprintResponseType,
  ResourceResponseType
} from '@/types/resource.type'

type RowFileReportProps = {
  data: ResourceOfSprintResponseType
}

const RowFileReport = ({ data }: RowFileReportProps) => {
  const message = messages.component.reportSprintSheet

  return (
    <div className='flex gap-10'>
      <div>
        <h4 className='mb-3 text-base font-semibold'>
          {message.form.daily1.label}
        </h4>
        <File resource={data.daily?.[0]} />
      </div>
      <div>
        <h4 className='mb-3 text-base font-semibold'>
          {message.form.daily2.label}
        </h4>
        <File resource={data.daily?.[1]} />
      </div>
      <div className='col-span-2'>
        <h4 className='mb-3 text-base font-semibold'>
          {message.form.backlog.label}
        </h4>
        <File resource={data.fileBacklog} />
      </div>
    </div>
  )
}

type FileProps = {
  resource?: ResourceResponseType | null
}

const File = ({ resource }: FileProps) => {
  if (!resource) {
    return (
      <div className='hover:bg-accent/30 focus-visible:border-ring/50 data-[dragging]:border-primary/30 data-[invalid]:border-destructive data-[dragging]:bg-accent/30 data-[invalid]:ring-destructive/20 relative flex items-center justify-start gap-2 rounded-lg border-2 border-dashed p-6 transition-colors outline-none select-none data-[disabled]:pointer-events-none'>
        <div className='flex items-center justify-center shadow-md'>
          <Icon icon={'mingcute:doc-line'} size={50} />
        </div>
        <div className='flex flex-1 flex-col gap-1'>
          <span className='line-clamp-1 w-[200px] text-base'>
            Chưa được cung cấp
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className='hover:bg-accent/30 focus-visible:border-ring/50 data-[dragging]:border-primary/30 data-[invalid]:border-destructive data-[dragging]:bg-accent/30 data-[invalid]:ring-destructive/20 relative flex items-center justify-start gap-2 rounded-lg border-2 border-dashed p-6 transition-colors outline-none select-none data-[disabled]:pointer-events-none'>
      <DocViewerRoot
        document={{
          uri: resource.url,
          fileType: 'pdf'
        }}
      >
        <DocViewerTrigger asChild>
          <div className='hover-opacity flex items-center justify-center shadow-md'>
            <Icon icon={'mingcute:doc-line'} size={50} />
          </div>
        </DocViewerTrigger>
        <div className='flex flex-1 flex-col gap-1'>
          <DocViewerTrigger asChild>
            <span className='hover-opacity line-clamp-1 w-[200px] text-base'>
              {resource.name}
            </span>
          </DocViewerTrigger>
        </div>
        <DocViewerContent />
      </DocViewerRoot>
    </div>
  )
}
export default RowFileReport
