import Icon from '@/components/Icon'
import { CreateFileData, Thumbnail } from '@/components/media/media'
import MediaProvider from '@/components/media/MediaProvider'
import ToolTip from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { REPORT_DIR } from '@/constant/app.const'
import messages from '@/constant/message.const'
import { useGetResourcesQuery } from '@/feature/project/project.api'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { getDateByPercent } from '@/lib/date.helper'
import { formatDate } from '@/lib/utils'
import { useDate } from '@/providers/DateProvider'
import resourceService from '@/services/resource.service'
import { SprintOverview } from '@/types/sprint.type'
import { isWithinInterval } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

type Sprint = SprintOverview

type ReportSprintSheetProps = {
  projectId: string
  sprint: Sprint
  isOpen?: boolean
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
}

const ReportSprintSheet = ({
  projectId,
  sprint,
  isOpen,
  onOpenChange
}: ReportSprintSheetProps) => {
  const message = messages.component.reportSprintSheet
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const { data } = useGetResourcesQuery({
    projectId: projectId,
    sprintId: sprint.id
  })
  const { now } = useDate()
  const [daily1, setDaily1] = useState<Thumbnail | null>(null)
  const [daily2, setDaily2] = useState<Thumbnail | null>(null)
  const [backlog, setBacklog] = useState<Thumbnail | null>(null)
  const status = getStatusSprint({
    id: sprint.id,
    start: sprint.start,
    end: sprint.end
  })
  const disableDaily1 = useCallback(() => {
    return !isWithinInterval(now, {
      start: sprint.start,
      end: getDateByPercent(sprint.start, sprint.end, 30)
    })
  }, [now, sprint])

  const disableDaily2 = useCallback(() => {
    return !isWithinInterval(now, {
      start: getDateByPercent(sprint.start, sprint.end, 30),
      end: sprint.end
    })
  }, [now, sprint])
  const handleSignatureFn = () => {
    return resourceService.getSignature({
      projectId: projectId,
      issueId: REPORT_DIR
    })
  }

  const handleUploadDaily = async (
    data: CreateFileData,
    type: 'daily1' | 'daily2'
  ): Promise<Thumbnail> => {
    const response = await resourceService.createResourceDaily({
      contentType: 'FILE',
      extension: data.format,
      name: data.baseName,
      publicId: data.public_id,
      size: data.bytes,
      projectId: projectId,
      sprintId: sprint.id
    })

    const thumbnail: Thumbnail = {
      id: response.id,
      url: response.url,
      name: response.name,
      placeContent: response.placeContent
    }

    if (type === 'daily1') {
      setDaily1(thumbnail)
      toast.success('Tải file báo cáo daily 1 thành công')
    } else {
      setDaily2(thumbnail)
      toast.success('Tải file báo cáo daily 2 thành công')
    }

    return thumbnail
  }

  const handleUploadBacklog = async (
    data: CreateFileData
  ): Promise<Thumbnail> => {
    const response = await resourceService.createResourceBacklog({
      contentType: 'FILE',
      extension: data.format,
      name: data.baseName,
      publicId: data.public_id,
      size: data.bytes,
      projectId: projectId,
      sprintId: sprint.id
    })

    const thumbnail: Thumbnail = {
      id: response.id,
      url: response.url,
      name: response.name,
      placeContent: response.placeContent
    }

    setBacklog(thumbnail)
    toast.success('Tải file báo cáo sprint backlog thành công')
    return thumbnail
  }

  const handleDelete = async (type: 'daily1' | 'daily2' | 'backlog') => {
    let resourceId

    if (type === 'daily1') resourceId = daily1?.id
    else if (type === 'daily2') resourceId = daily2?.id
    else resourceId = backlog?.id

    if (!resourceId) {
      toast.error('Resource not found')
      return
    }

    resourceService
      .deleteResource(resourceId)
      .then(() => {
        if (type === 'daily1') setDaily1(null)
        else if (type === 'daily2') setDaily2(null)
        else if (type === 'backlog') setBacklog(null)
        toast.success('Xóa file thành công')
      })
      .catch((_) => {
        toast.error('Failed to delete file')
      })
  }

  const validationDaily = (file: File): string | null => {
    const uploadedSize = file.size
    if (uploadedSize <= 11000) {
      return 'Dung lượng file không khớp, vui lòng nộp đúng file'
    }
    return null
  }

  useEffect(() => {
    if (data) {
      if (data.daily?.[0]) {
        const daily = data.daily[0]
        setDaily1({
          id: daily.id,
          url: daily.url,
          name: daily.name,
          placeContent: daily.placeContent
        })
      }
      if (data.daily?.[1]) {
        const daily = data.daily[1]
        setDaily2({
          id: daily.id,
          url: daily.url,
          name: daily.name,
          placeContent: daily.placeContent
        })
      }
      if (data.fileBacklog) {
        setBacklog({
          id: data.fileBacklog.id,
          url: data.fileBacklog.url,
          name: data.fileBacklog.name,
          placeContent: data.fileBacklog.placeContent
        })
      }
    }
  }, [data])

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className='min-w-[50vw]'>
        <SheetHeader>
          <SheetTitle>{message.title}</SheetTitle>

          <SheetDescription>{message.description}</SheetDescription>
        </SheetHeader>
        <div className='mt-4 grid flex-1 auto-rows-min grid-cols-2 gap-6'>
          <div>
            <h4 className='mb-3 flex items-center gap-2 text-base font-semibold'>
              {message.form.daily1.label}
              <ToolTip
                trigger={<Icon size={20} icon={'material-symbols:info'} />}
              >
                Nộp trước ngày{' '}
                {formatDate(getDateByPercent(sprint.start, sprint.end, 30))}
              </ToolTip>
            </h4>

            <MediaProvider
              thumbnail={daily1 ?? undefined}
              type={{
                mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                label: 'Excel Spreadsheet (.xlsx)'
              }}
              disabled={disableDaily1()}
              onFileValidate={validationDaily}
              signatureFn={handleSignatureFn}
              createFn={(data) => handleUploadDaily(data, 'daily1')}
              onDelete={() => handleDelete('daily1')}
            />
          </div>
          <div>
            <h4 className='mb-3 flex items-center gap-3 text-base font-semibold'>
              {message.form.daily2.label}
              <ToolTip
                trigger={<Icon size={20} icon={'material-symbols:info'} />}
              >
                Nộp trước ngày{' '}
                {formatDate(getDateByPercent(sprint.start, sprint.end, 70))}
              </ToolTip>
            </h4>

            <MediaProvider
              thumbnail={daily2 ?? undefined}
              type={{
                mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                label: 'Excel Spreadsheet (.xlsx)'
              }}
              signatureFn={handleSignatureFn}
              disabled={disableDaily2()}
              createFn={(data) => handleUploadDaily(data, 'daily2')}
              onDelete={() => handleDelete('daily2')}
            />
          </div>
          <div className='col-span-2'>
            <h4 className='mb-3 text-base font-semibold'>
              {message.form.backlog.label}
            </h4>
            <MediaProvider
              thumbnail={backlog ?? undefined}
              type={{
                mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                label: 'Excel Spreadsheet (.xlsx)'
              }}
              signatureFn={handleSignatureFn}
              disabled={disableDaily2()}
              createFn={handleUploadBacklog}
              onDelete={() => handleDelete('backlog')}
            />
          </div>
        </div>
        <SheetFooter className='mt-3'>
          <div className='flex w-full items-center justify-between'>
            <p>
              {status === 'COMPLETE' && message.status.complete}
              {status === 'PENDING' && message.status.pending}
            </p>
            <SheetClose asChild>
              <Button className='cancel' variant='outline'>
                {message.close}
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ReportSprintSheet
