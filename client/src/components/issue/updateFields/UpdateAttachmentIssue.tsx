import Icon from '@/components/Icon'
import ListView from '@/components/ListView'
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
import messages from '@/constant/message.const'
import useAppId from '@/hooks/use-app-id'
import { uuid } from '@/lib/utils'
import resourceService from '@/services/resource.service'
import { Upload } from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
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

const FileAttachmentContext = createContext<FileAttachmentContextType | null>(
  null
)

const useFileAttachmentContext = () => {
  const context = useContext(FileAttachmentContext)
  if (!context) {
    throw new Error(
      'useFileAttachmentContext must be used within a FileAttachmentProvider'
    )
  }
  return context
}

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
    <FileAttachmentContext.Provider
      value={{
        issueId: issueId,
        attachments: attachments,
        setAttachments: setAttachments,
        onDelete: onDelete,
        onCreate: onCreate
      }}
    >
      <div className='border-accent mt-4 flex flex-col gap-3 border-2 p-2'>
        <span className='text-lg'>
          {messages.component.issue.update.form.attachment}
        </span>
        <UpdateAttachmentIssueUpload />
        <ListAttachmentIssue />
      </div>
    </FileAttachmentContext.Provider>
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
            const { apiKey, folder, signature, timestamp, url } =
              await resourceService.getSignature({
                projectId: projectId!,
                issueId: issueId
              })

            const { public_id, bytes, format } =
              await resourceService.uploadFileToCloudinaryWithSignature(file, {
                apiKey: apiKey,
                folder: folder,
                signature: signature,
                timestamp: timestamp,
                urlUpload: url
              })

            await onCreate({
              contentType: 'IMAGE',
              extension: format,
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
          loading: 'Uploading files...',
          success: 'All files uploaded successfully',
          error: 'Error uploading files'
        })

        setFiles([]) // Clear files after upload
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
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
            className='flex items-start gap-4 rounded-md bg-white p-2 shadow-md'
          >
            <AttachmentPreview
              id={item.id}
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
              loading: 'Deleting file...',
              success: 'File deleted successfully',
              error: 'File is deleted or not exist'
            })
          }}
        >
          <Icon icon={'line-md:trash'} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type AttachmentPreviewProps = Attachment & {}

const AttachmentPreview = ({
  filename,
  url,
  extension
}: AttachmentPreviewProps) => {
  const icon = useMemo(() => {
    switch (extension.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return (
          <div className='rounded-md border-1 p-1 shadow-md'>
            <img
              src={url}
              alt={filename}
              loading='lazy'
              className='h-[80px] w-[120px] overflow-hidden object-cover'
            />
          </div>
        )

      case 'pdf':
        return <div>📄 PDF</div>

      case 'docx':
      case 'doc':
        return <div>📝 Word</div>

      case 'xlsx':
      case 'xls':
        return <div>📊 Excel</div>

      case 'ppt':
      case 'pptx':
        return <div>📽 PowerPoint</div>

      default:
        return <div>📁 File</div>
    }
  }, [url, extension, filename])

  return icon
}

export default UpdateAttachmentIssue
