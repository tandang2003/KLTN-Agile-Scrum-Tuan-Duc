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
      error: string
    }[]

    errors.forEach(({ field, error }) => {
      setError(field, {
        type: 'server',
        message: error
      })
    })
  } else {
    console.log('toast error')
    toast.error(error?.error ?? 'Lỗi không xác định', {
      duration: duration,
      action: {
        label: 'Lỗi',
        onClick: () => {}
      }
    })
  }
}
