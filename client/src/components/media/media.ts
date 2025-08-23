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
  },
  xlsx: {
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    label: 'Excel Spreadsheet (.xlsx)'
  }
} as const

export type FileExtension = keyof typeof DEFAULT_ALLOWED_FILE_TYPES
export type FileType = (typeof DEFAULT_ALLOWED_FILE_TYPES)[FileExtension]

export type CreateFileData = CloudinaryUploadResultType & {
  baseName: string
  fileName: string
  extension: string
}

export type MediaPreviewProps = {}

export type MediaMediaUploadingProps = {
  files?: Promise<File>[]
  maximum?: number
  type?: FileType
  maxSize?: number // in bytes
  onFileValidate?: (file: File) => string | null
  signatureFn: (file: File) => Promise<GetSignatureResponseType>
  createFn?: (data: CreateFileData) => Promise<Thumbnail>
  errorFn?: (error: Error) => void
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

export type MediaProps = {
  thumbnail?: Thumbnail
  children?: React.ReactNode
  onDelete?: () => Promise<void>
  disabled?: boolean
} & Omit<MediaMediaUploadingProps, 'files' | 'maximum'>

export type MediaViewProps = {
  thumbnail?: Thumbnail
}
