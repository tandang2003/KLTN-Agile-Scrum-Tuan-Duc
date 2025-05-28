import { KeyOfFieldChangingIssue, UpdateIssueType } from '@/types/issue.type'
import { isEqual } from 'lodash'
import { useEffect, useRef } from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'

type UseAutoUpdateFieldProps<K extends KeyOfFieldChangingIssue> = {
  form: UseFormReturn<UpdateIssueType>
  field: K
  condition?: (field: K, value: UpdateIssueType[K]) => boolean
  onPending?: (field: K, value: UpdateIssueType[K]) => Promise<void>
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
}

export function useAutoUpdateField<K extends KeyOfFieldChangingIssue>({
  form,
  field,
  condition,
  onPending,
  onSuccess,
  onError
}: UseAutoUpdateFieldProps<K>) {
  const { control, setValue, trigger } = form
  const watched = useWatch<UpdateIssueType>({
    control: control,
    name: field
  }) as UpdateIssueType[K]
  const hasMounted = useRef(false)
  const previousValue = useRef<UpdateIssueType[K] | undefined>(watched)
  const isRollingBack = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    // Skip when it's transitioning from [] → [item]
    if (
      watched == undefined ||
      watched == null ||
      (Array.isArray(watched) && watched.length === 0)
    ) {
      return
    }

    if (isRollingBack.current) {
      isRollingBack.current = false
      return
    }

    if (isEqual(previousValue.current, watched)) return

    if (condition) {
      const passed = condition(field, watched)
      if (!passed) return
    }

    const handle = async () => {
      const isValid = await trigger(field)
      if (!isValid) return
      try {
        await onPending?.(field, watched)
        previousValue.current = watched

        onSuccess?.(watched)
      } catch (err) {
        isRollingBack.current = true
        setValue(field, previousValue.current as any)

        console.error(`Failed to update ${field}:`, err)
        onError?.(err)
      }
    }

    handle()
  }, [watched])
}
