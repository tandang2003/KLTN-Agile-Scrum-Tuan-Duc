import { Id } from '@/types/other.type'

type GetSignatureRequestType = {
  projectId: string
  issueId: string
}

type GetSignatureResponseType = {
  folder: string
  signature: string
  timestamp: string
  apiKey: string
  cloudName: string
  url: string
}

type CloudinaryUploadResultType = {
  public_id: string
  signature: string
  resource_type: string
  format: string
  url: string
  bytes: number
}

type CreateResourceRequestType = {
  name: string
  extension: string
  publicId: string
  contentType: 'IMAGE' | 'FILE'
  issueId: string
  size: number
}

type CreateResourceDailyRequestType = {
  name: string
  extension: string
  publicId: string
  contentType: 'IMAGE' | 'FILE'
  size: number
  projectId: string
  sprintId: string
}

type CreateResourceAvatarRequestType = {
  name: string
  extension: string
  contentType: 'IMAGE' | 'FILE'
  size: number
  publicId: string
}

type ResourceResponseType = {
  id: string
  name: string
  contentType: 'IMAGE' | 'FILE'
  placeContent: string
  size: number
  url: string
  extension: string
}

type ResourceOfSprintResponseType = {
  daily: ResourceResponseType[]
  fileBacklog: ResourceResponseType | null
}

type ProjectResourceResponseType = Array<
  {
    id: Id
    name: string
    title: string
  } & ResourceOfSprintResponseType
>

type SprintResourceResponseType = Array<
  {
    id: Id
    name: string
  } & ResourceOfSprintResponseType
>

export type {
  GetSignatureRequestType,
  GetSignatureResponseType,
  CloudinaryUploadResultType,
  CreateResourceRequestType,
  ResourceResponseType,
  CreateResourceDailyRequestType,
  ResourceOfSprintResponseType,
  CreateResourceAvatarRequestType,
  ProjectResourceResponseType,
  SprintResourceResponseType
}
