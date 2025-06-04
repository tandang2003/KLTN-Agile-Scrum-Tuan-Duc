import { UpdateIssueType } from '@/types/issue.type'
import { isEqual } from 'lodash'
import { useEffect, useRef } from 'react'
import { Path, PathValue, UseFormReturn, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

type FieldKey = Path<UpdateIssueType>
type FieldValue<K extends FieldKey> = PathValue<UpdateIssueType, K>

type UseAutoUpdateFieldProps<K extends FieldKey> = {
  form: UseFormReturn<UpdateIssueType>
  field: K
  isPause?: (field: K, value: FieldValue<K>) => boolean
  callApi?: (field: K, value: FieldValue<K>) => Promise<any> | undefined
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
  deps?: any[]
}

export function useAutoUpdateField<K extends FieldKey>({
  form,
  field,
  isPause,
  callApi,
  onSuccess,
  onError,
  deps = []
}: UseAutoUpdateFieldProps<K>) {
  const { control, setValue, trigger } = form
  const watched = useWatch<UpdateIssueType>({
    control: control,
    name: field
  }) as FieldValue<K>
  const hasMounted = useRef(false)
  const previousValue = useRef<PathValue<UpdateIssueType, K> | undefined>(
    watched
  )
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

    if (isPause) {
      const passed = isPause(field, watched)
      if (passed) return
    }

    const handle = async () => {
      console.log(watched)
      const isValid = await trigger(field)
      console.log('isValid', isValid)
      if (!isValid) return
      try {
        await callApi?.(field, watched)
        previousValue.current = watched

        if (onSuccess) onSuccess?.(watched)
        else toast.success(`${field} updated success`)
      } catch (err) {
        isRollingBack.current = true
        setValue(field, previousValue.current as any)

        if (onError) onError?.(err)
        else toast.error(`Failed to update ${field}`)
      }
    }

    handle()
  }, [watched, ...deps])
}
