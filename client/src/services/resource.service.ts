import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import {
  CloudinaryUploadResultType,
  CreateResourceRequestType,
  GetSignatureRequestType,
  GetSignatureResponseType
} from '@/types/resource.type'

const resourceService = {
  getSignature: async (
    req: GetSignatureRequestType
  ): Promise<GetSignatureResponseType> => {
    const res = await httpService.post<
      ResponseApi<GetSignatureResponseType>,
      GetSignatureRequestType & { userId: string }
    >('/resource/signature', { ...req, userId: '1' })
    return res.data.data
  },

  uploadFileToCloudinary: async (
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
      ResponseApi<void>,
      CreateResourceRequestType
    >('/resource/task/upload', req)
    return res.data.data
  }
}

export default resourceService
