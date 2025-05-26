import { useUpdateIssueMutation } from '@/feature/issue/issue.api'
import { BaseIssueFormType } from '@/types/issue.type'
import { useEffect } from 'react'
import { useWatch, Control } from 'react-hook-form'

type UseAutoUpdateFieldProps = {
  control: Control<BaseIssueFormType>
  field: keyof BaseIssueFormType
  id?: string
  enabled?: boolean
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
}

export function useAutoUpdateField({
  control,
  field,
  id,
  enabled = true,
  onSuccess,
  onError
}: UseAutoUpdateFieldProps) {
  const [update] = useUpdateIssueMutation()

  const value = useWatch({
    control,
    name: field
  })

  useEffect(() => {
    if (!enabled || !id) return
    console.log('render')
    // update({
    //   id,
    //   [field]: value,
    //   fieldChanging: field
    // })
    //   .unwrap()
    //   .then((res) => {
    //     console.log(`Updated ${field}:`, res)
    //     onSuccess?.(res)
    //   })
    //   .catch((err) => {
    //     console.error(`Failed to update ${field}:`, err)
    //     onError?.(err)
    //   })
  }, [value])
}
