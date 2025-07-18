import { MediaMediaUploadingProps } from '@/components/media/media'
import { useMediaContext } from '@/components/media/MediaContext'
import MediaLoading from '@/components/media/MediaLoading'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger
} from '@/components/ui/file-upload'
import resourceService from '@/services/resource.service'

import { Upload } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

const MediaUploading = ({
  signatureFn,
  createFn,
  maximum,
  type,
  maxSize,
  onFileValidate: ownValidate
}: MediaMediaUploadingProps) => {
  const { setThumbnail } = useMediaContext()
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   if (thumbnail) {
  //     createFileFromUrl(thumbnail.url, thumbnail.name).then((file) => {
  //       setFiles([file])
  //     })
  //   }
  // }, [thumbnail])

  const onFileValidate = useCallback(
    (file: File): string | null => {
      // Validate max files
      if (maximum && files.length >= maximum) {
        return `You can only upload up to ${maximum} files`
      }

      if (type) {
        const mime = file.type
        if (mime !== type.mime) {
          return `File type must be ${type.label}`
        }
      }

      // Validate file size (max 2MB)
      if (maxSize && file.size > maxSize) {
        return `File size must be less than ${maxSize / (1024 * 1024)}MB`
      }

      if (ownValidate) return ownValidate?.(file)
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
        setLoading(true)
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
              await signatureFn()

            const response =
              await resourceService.uploadFileToCloudinaryWithSignature(file, {
                apiKey: apiKey,
                folder: folder,
                signature: signature,
                timestamp: timestamp,
                urlUpload: url
              })

            if (createFn) {
              const resource = await createFn({
                ...response,
                fileName: fileName,
                baseName: baseName
              })
              setThumbnail?.({
                id: resource.id,
                url: resource.url,
                name: resource.name,
                placeContent: resource.placeContent
              })
            }

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
      } finally {
        setLoading(false)
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
      maxFiles={maxSize}
      className='w-full'
      multiple={maximum !== 1}
    >
      <FileUploadDropzone>
        {!loading ? (
          <>
            <div className='flex w-full flex-col items-center gap-1'>
              <div className='flex items-center justify-center rounded-full border p-2.5'>
                <Upload className='text-muted-foreground size-6' />
              </div>
              <p className='text-sm font-medium'>Drag & drop files here</p>
            </div>
            <FileUploadTrigger asChild></FileUploadTrigger>
          </>
        ) : (
          <MediaLoading />
        )}
      </FileUploadDropzone>
    </FileUpload>
  )
}

export default MediaUploading
