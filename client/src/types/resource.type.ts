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

export type {
  GetSignatureRequestType,
  GetSignatureResponseType,
  CloudinaryUploadResultType,
  CreateResourceRequestType
}
