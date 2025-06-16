import { Button } from '@/components/ui/button'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger
} from '@/components/ui/file-upload'
import useAppId from '@/hooks/use-app-id'
import resourceService from '@/services/resource.service'
import { Upload, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

type UpdateAttachmentIssueProps = {
  files?: Promise<File>[]
  issueId: string
}

const UpdateAttachmentIssue = ({
  files: data,
  issueId
}: UpdateAttachmentIssueProps) => {
  const { projectId } = useAppId()
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    const resolveFiles = async () => {
      if (!data) return
      try {
        const resolvedFiles = await Promise.all(data)
        setFiles(resolvedFiles)
      } catch (err) {
        console.error('Failed to resolve file promises:', err)
      }
    }

    resolveFiles()
  }, [data])

  const onDelete = useCallback((resourceId: string) => {
    resourceService
      .deleteResource(resourceId)
      .then(() => {
        toast.success('Delete file success')
        setFiles((prevFiles) =>
          prevFiles.filter((file) => file.name !== resourceId)
        )
      })
      .catch((error) => {
        console.error('Failed to delete resource:', error)
        toast.error('Failed to delete file')
      })
  }, [])

  const onFileValidate = useCallback(
    (file: File): string | null => {
      // Validate max files
      // if (files.length >= 2) {
      //   return 'You can only upload up to 2 files'
      // }

      // Validate file type (only images)
      if (!file.type.startsWith('image/')) {
        return 'Only image files are allowed'
      }

      // Validate file size (max 2MB)
      const MAX_SIZE = 2 * 1024 * 1024 // 2MB
      if (file.size > MAX_SIZE) {
        return `File size must be less than ${MAX_SIZE / (1024 * 1024)}MB`
      }

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
              await resourceService.uploadFileToCloudinary(file, {
                apiKey: apiKey,
                folder: folder,
                signature: signature,
                timestamp: timestamp,
                urlUpload: url
              })

            await resourceService.createResource({
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
        await Promise.all(uploadPromises)
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
        console.error('Unexpected error during upload:', error)
      }
    },
    []
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
      accept='image/*'
      maxFiles={2}
      className='w-full'
      multiple
    >
      <FileUploadDropzone>
        <div className='flex w-full flex-col items-center gap-1'>
          <div className='flex items-center justify-center rounded-full border p-2.5'>
            <Upload className='text-muted-foreground size-6' />
          </div>
          <p className='text-sm font-medium'>Drag & drop files here</p>
        </div>
        <FileUploadTrigger asChild></FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={file.name} value={file}>
            <FileUploadItemPreview className='size-20'>
              <FileUploadItemProgress variant='fill' />
            </FileUploadItemPreview>
            <FileUploadItemMetadata />
            <FileUploadItemDelete
              data-id-resource={index}
              onClick={(event) => {
                const resourceId = event.currentTarget.dataset.idResource
                if (resourceId) {
                  onDelete(resourceId)
                }
              }}
              asChild
            >
              <Button variant='ghost' size='icon' className='size-7'>
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  )
}

export default UpdateAttachmentIssue
