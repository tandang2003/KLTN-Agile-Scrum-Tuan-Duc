import {
  CloudinaryUploadResultType,
  GetSignatureResponseType
} from '@/types/resource.type'

export const DEFAULT_ALLOWED_FILE_TYPES = {
  jpg: { mime: 'image/jpeg', label: 'JPEG Image' },
  jpeg: { mime: 'image/jpeg', label: 'JPEG Image' },
  png: { mime: 'image/png', label: 'PNG Image' },
  pdf: { mime: 'application/pdf', label: 'PDF Document' },
  docx: {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    label: 'Word Document (.docx)'
  }
} as const

export type FileExtension = keyof typeof DEFAULT_ALLOWED_FILE_TYPES
export type FileType = (typeof DEFAULT_ALLOWED_FILE_TYPES)[FileExtension]

export type CreateFileData = CloudinaryUploadResultType & {
  baseName: string
  fileName: string
}

export type MediaPreviewProps = {}

export type MediaMediaUploadingProps = {
  files?: Promise<File>[]
  maximum?: number
  type?: FileType
  maxSize?: number // in bytes
  onFileValidate?: (file: File) => string | null
  signatureFn: () => Promise<GetSignatureResponseType>
  createFn?: (data: CreateFileData) => Promise<Thumbnail>
}

export type Thumbnail = {
  id: string
  url: string
  name: string
  placeContent: string
  createdAt?: Date
}

export type MediaContextType = {
  onDelete?: () => void
  thumbnail?: Thumbnail
  setThumbnail?: (thumbnail: Thumbnail) => void
  disabled: boolean
}

export type MediaProviderProps = {
  thumbnail?: Thumbnail
  children?: React.ReactNode
  onDelete?: () => Promise<void>
  disabled?: boolean
} & Omit<MediaMediaUploadingProps, 'files' | 'maximum'>

export async function createFileFromUrl(
  url: string,
  filename: string
): Promise<File> {
  const response = await fetch(url)
  const blob = await response.blob()

  return new File([blob], filename, {
    type: blob.type,
    lastModified: Date.now()
  })
}
