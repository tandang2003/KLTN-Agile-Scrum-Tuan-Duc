import resourceService from '@/services/resource.service'
import { CloudinaryUploadResultType } from '@/types/resource.type'
import { useEffect, useState } from 'react'

type useUploadFileInput<T = void> = {
  file?: File | null
  callback?: (res: CloudinaryUploadResultType) => Promise<T>
}

type useUploadFileOutput<T = void> = {
  isLoading: boolean | null
  data: T extends void ? null : T | null
  error?: Error | null
}

const useUploadFile = <T,>({
  file,
  callback
}: useUploadFileInput<T>): useUploadFileOutput<T> => {
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    if (file) {
      setIsLoading(true)
      resourceService
        .uploadFileToCloudinary(file, {
          issueId: '',
          projectId: 'user'
        })
        .then((res) => callback?.(res).then((data) => setData(data)))
        .catch((err) => {
          setError(err)
        })
        .finally(() => setIsLoading(false))
    }
  }, [file])

  return {
    isLoading: isLoading,
    data: data,
    error: error
  } as useUploadFileOutput<T>
}

export default useUploadFile
