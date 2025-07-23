import { CreateFileData, Thumbnail } from '@/components/media/media'
import MediaProvider from '@/components/media/MediaProvider'
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
import { useGetResourcesQuery } from '@/feature/project/project.api'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { REPORT_DIR } from '@/constant/app.const'
import resourceService from '@/services/resource.service'
import { SprintOverview } from '@/types/sprint.type'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import messages from '@/constant/message.const'

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

  const [daily1, setDaily1] = useState<Thumbnail | null>(null)
  const [daily2, setDaily2] = useState<Thumbnail | null>(null)
  const [backlog, setBacklog] = useState<Thumbnail | null>(null)
  const status = getStatusSprint({
    id: sprint.id,
    start: sprint.start,
    end: sprint.end
  })
  const disabled = status === 'COMPLETE'
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
      toast.success('Upload file daily 1')
    } else {
      setDaily2(thumbnail)
      toast.success('Upload file daily 2')
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
    toast.success('Upload file success')
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
        toast.success('Delete file success')
      })
      .catch((error) => {
        console.error('Failed to delete resource:', error)
        toast.error('Failed to delete file')
      })
  }

  const validationDaily = (file: File): string | null => {
    const uploadedSize = file.size
    if (uploadedSize <= 11130) {
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
            <h4 className='mb-3 text-base font-semibold'>
              {message.form.daily1.label}
            </h4>
            <MediaProvider
              thumbnail={daily1 ?? undefined}
              type={
                ({
                  label: 'PDF Document',
                  mime: 'application/pdf'
                },
                {})
              }
              disabled={disabled}
              onFileValidate={validationDaily}
              signatureFn={handleSignatureFn}
              createFn={(data) => handleUploadDaily(data, 'daily1')}
              onDelete={() => handleDelete('daily1')}
            />
          </div>
          <div>
            <h4 className='mb-3 text-base font-semibold'>
              {message.form.daily2.label}
            </h4>
            <MediaProvider
              thumbnail={daily2 ?? undefined}
              signatureFn={handleSignatureFn}
              disabled={disabled}
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
              signatureFn={handleSignatureFn}
              disabled={disabled}
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
