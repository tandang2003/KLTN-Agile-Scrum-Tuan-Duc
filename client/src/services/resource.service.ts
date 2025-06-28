import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import {
  CloudinaryUploadResultType,
  CreateResourceAvatarRequestType,
  CreateResourceDailyRequestType,
  CreateResourceRequestType,
  GetSignatureRequestType,
  GetSignatureResponseType,
  ResourceResponseType
} from '@/types/resource.type'

const resourceService = {
  getSignature: async (
    req: GetSignatureRequestType
  ): Promise<GetSignatureResponseType> => {
    const res = await httpService.post<
      ResponseApi<GetSignatureResponseType>,
      GetSignatureRequestType
    >('/resource/signature', req)
    return res.data.data
  },

  uploadFileToCloudinaryWithSignature: async (
    file: File,
    {
      urlUpload,
      apiKey,
      signature,
      timestamp,
      folder
    }: {
      urlUpload: string
      apiKey: string
      timestamp: string
      signature: string
      folder: string
    }
  ): Promise<CloudinaryUploadResultType> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', apiKey)
    formData.append('timestamp', timestamp.toString())
    formData.append('signature', signature)
    formData.append('folder', folder)
    formData.append('overwrite', 'false')
    formData.append('use_filename', 'true')
    formData.append('unique_filename', 'true')

    const res = await fetch(urlUpload, {
      method: 'POST',
      body: formData
    })

    return await res.json()
  },

  createResource: async (req: CreateResourceRequestType) => {
    const res = await httpService.post<
      ResponseApi<ResourceResponseType>,
      CreateResourceRequestType
    >('/resource/issue', req)
    return res.data.data
  },

  deleteResource: async (resourceId: string) => {
    const res = await httpService.delete<ResponseApi<void>>(
      `/resource/${resourceId}`
    )
    return res.data.data
  },

  createResourceDaily: async (req: CreateResourceDailyRequestType) => {
    const res = await httpService.post<
      ResponseApi<ResourceResponseType>,
      CreateResourceDailyRequestType
    >('/resource/daily', req)
    return res.data.data
  },

  createResourceBacklog: async (req: CreateResourceDailyRequestType) => {
    const res = await httpService.post<
      ResponseApi<ResourceResponseType>,
      CreateResourceDailyRequestType
    >('/resource/backlog', req)
    return res.data.data
  },
  createResourceAvatar: async (req: CreateResourceAvatarRequestType) => {
    const res = await httpService.post<
      ResponseApi<ResourceResponseType>,
      CreateResourceAvatarRequestType
    >('/resource/avatar', req)
    return res.data.data
  },
  uploadFileToCloudinary: async (
    file: File,
    req: GetSignatureRequestType
  ): Promise<CloudinaryUploadResultType> => {
    const responseSignature = await httpService.post<
      ResponseApi<GetSignatureResponseType>,
      GetSignatureRequestType
    >('/resource/signature', req)

    const { apiKey, folder, signature, timestamp, url } =
      responseSignature.data.data

    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', apiKey)
    formData.append('timestamp', timestamp.toString())
    formData.append('signature', signature)
    formData.append('folder', folder)
    formData.append('overwrite', 'false')
    formData.append('use_filename', 'true')
    formData.append('unique_filename', 'true')

    const res = await fetch(url, {
      method: 'POST',
      body: formData
    })

    return await res.json()
  }
}

export default resourceService
