import { ValidationError } from '@/types/http.type'
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'

export function handleErrorApi({
  error,
  setError,
  duration = 5000
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError?: UseFormSetError<any>
  duration?: number
}) {
  if (error instanceof ValidationError && setError) {
    const errors = error.error as {
      field: string
      message: string
    }[]

    errors.forEach(({ field, message }) => {
      setError(field, {
        type: 'server',
        message: message
      })
    })
  } else {
    toast.error(error?.error ?? 'Can not define', {
      duration: duration,
      action: {
        label: 'Error',
        onClick: () => {}
      }
    })
  }
}

export const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  return error?.message || 'Lỗi server'
}
