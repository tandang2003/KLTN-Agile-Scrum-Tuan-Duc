import { useUpdateIssueMutation } from '@/feature/issue/issue.api'
import { BaseIssueFormType } from '@/types/issue.type'
import { useEffect } from 'react'
import { useWatch, Control, UseFormTrigger } from 'react-hook-form'

type UseAutoUpdateFieldProps = {
  control: Control<BaseIssueFormType>
  trigger?: UseFormTrigger<BaseIssueFormType>
  field: keyof BaseIssueFormType
  id?: string
  enabled?: boolean
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
}

export function useAutoUpdateField({
  control,
  trigger,
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
    const handle = async () => {
      if (!enabled || !id) return
      if (trigger) {
        const isValid = await trigger(field)
        if (!isValid) {
          return
        }
      }

      try {
        const res = await update({
          id,
          [field]: value,
          fieldChanging: field
        }).unwrap()

        console.log(`Updated ${field}:`, res)
        onSuccess?.(res)
      } catch (err) {
        console.error(`Failed to update ${field}:`, err)
        onError?.(err)
      }
    }

    handle()
  }, [value])
}
