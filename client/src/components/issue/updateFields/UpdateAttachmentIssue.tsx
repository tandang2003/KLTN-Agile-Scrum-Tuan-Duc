import Icon from '@/components/Icon'
import AttachmentView from '@/components/issue/AttachmenView'
import ListView from '@/components/ListView'
import TitleLevel from '@/components/TitleLevel'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger
} from '@/components/ui/file-upload'
import { MAX_SIZE } from '@/constant/app.const'
import messages from '@/constant/message.const'
import useAppId from '@/hooks/use-app-id'
import { createCtx } from '@/lib/context.helper'
import { getResourceTypeFromEx } from '@/lib/file.helper'
import { uuid } from '@/lib/utils'
import resourceService from '@/services/resource.service'
import { Upload } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

type Attachment = {
  id: string
  filename: string
  url: string
  extension: string
}

type CreateAttachmentInputType = {
  contentType: 'IMAGE' | 'FILE'
  extension: string
  issueId: string
  name: string
  publicId: string
  size: number
}

type FileAttachmentContextType = {
  attachments?: Attachment[]
  setAttachments: (attachments: Attachment[]) => void
  issueId: string
  onDelete: (resourceId: string) => Promise<void>
  onCreate: (data: CreateAttachmentInputType) => Promise<void>
}

const [useFileAttachmentContext, FileAttachmentContext] =
  createCtx<FileAttachmentContextType>()

type UpdateAttachmentIssueProps = {
  data?: Attachment[]
  issueId: string
}

export const UpdateAttachmentIssue = ({
  data: initialData,
  issueId
}: UpdateAttachmentIssueProps) => {
  const [attachments, setAttachments] = useState<Attachment[]>(
    initialData || []
  )

  const onCreate = useCallback(
    async ({
      publicId,
      contentType,
      extension,
      issueId,
      name,
      size
    }: CreateAttachmentInputType) => {
      const response = await resourceService.createResource({
        contentType: contentType,
        extension: extension,
        issueId: issueId,
        name: name,
        publicId: publicId,
        size: size
      })
      setAttachments((prev) => [
        ...(prev || []),
        {
          id: response.id,
          filename: response.name,
          url: response.url,
          extension: response.extension
        }
      ])
      toast.success('Create file success', {
        description: `File ${name} has been uploaded successfully`
      })
    },
    []
  )

  const onDelete = useCallback(async (resourceId: string) => {
    await resourceService.deleteResource(resourceId)
    setAttachments(
      attachments?.filter((attachment) => attachment.id !== resourceId) ?? []
    )
  }, [])

  return (
    <FileAttachmentContext
      value={{
        issueId: issueId,
        attachments: attachments,
        setAttachments: setAttachments,
        onDelete: onDelete,
        onCreate: onCreate
      }}
    >
      <div className='flex flex-col gap-3'>
        <TitleLevel level={'lv-2'}>
          {messages.component.issue.update.form.attachment}
        </TitleLevel>
        <UpdateAttachmentIssueUpload />
        <ListAttachmentIssue />
      </div>
    </FileAttachmentContext>
  )
}

type UpdateAttachmentIssueUploadProps = {}

const UpdateAttachmentIssueUpload = ({}: UpdateAttachmentIssueUploadProps) => {
  const { onCreate } = useFileAttachmentContext()
  const { projectId } = useAppId()
  const { issueId } = useFileAttachmentContext()
  const [files, setFiles] = useState<File[]>([])

  const onFileValidate = useCallback(
    (_file: File): string | null => {
      return null
    },
    [files]
  )

  const onUpload = useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError
      }: {
        onProgress: (file: File, progress: number) => void
        onSuccess: (file: File) => void
        onError: (file: File, error: Error) => void
      }
    ) => {
      try {
        // Process each file individually
        const uploadPromises = files.map(async (file) => {
          try {
            // Simulate file upload with progress
            const totalChunks = 10
            let uploadedChunks = 0

            // Simulate chunk upload with delays
            for (let i = 0; i < totalChunks; i++) {
              // Simulate network delay (100-300ms per chunk)
              await new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 200 + 100)
              )

              // Update progress for this specific file
              uploadedChunks++
              const progress = (uploadedChunks / totalChunks) * 100
              onProgress(file, progress)
            }

            // Simulate server processing delay
            const fileName = file.name // Full name: "model.obj"
            const baseName = fileName.substring(0, fileName.lastIndexOf('.'))
            const extension = fileName.split('.').pop() || ''
            const resourceType = getResourceTypeFromEx(file.type)

            const { apiKey, folder, signature, timestamp, url } =
              await resourceService.getSignature({
                projectId: projectId!,
                issueId: issueId,
                extension: extension,
                nameFile: fileName,
                resourceType: resourceType
              })

            const { public_id, bytes } =
              await resourceService.uploadFileToCloudinaryWithSignature(file, {
                apiKey: apiKey,
                folder: folder,
                signature: signature,
                timestamp: timestamp,
                urlUpload: url
              })

            await onCreate({
              contentType: 'IMAGE',
              extension: extension,
              issueId: issueId,
              name: baseName,
              publicId: public_id,
              size: bytes
            })

            toast.success('Uploaded files:', {
              description: `Update file ${baseName} success`
            })

            onSuccess(file)
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error('Upload failed')
            )
            toast.error(
              error instanceof Error
                ? error.message
                : 'An unknown error occurred'
            )
          }
        })

        // Wait for all uploads to complete
        toast.promise(Promise.all(uploadPromises), {
          loading: 'Đang thực hiện upload file',
          success: 'File đã được upload thành công',
          error: 'Có lỗi xảy ra trong quá trình upload file'
        })

        setFiles([]) // Clear files after upload
      } catch (error) {
        console.error('Unexpected error during upload:', error)
      }
    },
    [projectId, issueId]
  )

  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`
    })
  }, [])

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onFileValidate={onFileValidate}
      onFileReject={onFileReject}
      onUpload={onUpload}
      maxSize={MAX_SIZE}
      className='w-full'
      multiple
    >
      <FileUploadDropzone>
        <div className='flex w-full flex-col items-center gap-1'>
          <div className='flex items-center justify-center rounded-full border p-2.5'>
            <Upload className='text-muted-foreground size-6' />
          </div>
          <p className='text-sm font-medium'>Kéo thả file vào đây</p>
        </div>
        <FileUploadTrigger asChild></FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files?.map((file) => (
          <FileUploadItem key={uuid()} value={file}>
            <FileUploadItemPreview className='size-20'>
              <FileUploadItemProgress variant='fill' />
            </FileUploadItemPreview>
            <FileUploadItemMetadata />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  )
}

type ListAttachmentIssueProps = {}

const ListAttachmentIssue = ({}: ListAttachmentIssueProps) => {
  const { attachments } = useFileAttachmentContext()

  return (
    <ListView<Attachment>
      data={attachments}
      emptyComponent={<span></span>}
      className='gap-4'
      render={(item) => {
        return (
          <div
            key={item.id}
            className='flex items-start gap-4 rounded-md border-2 bg-white p-2 shadow-md'
          >
            <AttachmentView
              extension={item.extension}
              filename={item.filename}
              url={item.url}
            />
            <span>{item.filename}</span>
            <AttachmentDropdownMenu id={item.id} />
          </div>
        )
      }}
    />
  )
}

type AttachmentDropdownMenuProps = {
  id: string
}

const AttachmentDropdownMenu = ({ id }: AttachmentDropdownMenuProps) => {
  const { onDelete } = useFileAttachmentContext()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='ml-auto h-fit'>
        <Icon icon={'ri:more-fill'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='cancel'
          onClick={() => {
            toast.promise(onDelete(id), {
              loading: 'Đang xóa file',
              success: 'File xóa thành công',
              error: 'File is deleted or not exist'
            })
          }}
        >
          <Icon icon={'line-md:trash'} /> Xóa file
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UpdateAttachmentIssue
