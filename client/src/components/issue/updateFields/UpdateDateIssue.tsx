import { useSprintSelect } from '@/components/issue/IssueSelectSprintContext'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { useFormContext } from 'react-hook-form'

const UpdateDateIssue = () => {
  const { sprint } = useSprintSelect()
  const min = sprint?.start ?? undefined
  const max = sprint?.end ?? undefined

  const form = useFormContext<UpdateIssueType>()
  const { control, getValues } = form

  useAutoUpdateField({
    form: form,
    field: 'date.from',
    callApi: (_, value) => {
      return issueService.updateIssue({
        id: getValues('id'),
        fieldChanging: 'start',
        start: value
      })
    }
  })

  useAutoUpdateField({
    form: form,
    field: 'date.to',
    callApi: (_, value) => {
      return issueService.updateIssue({
        id: getValues('id'),
        fieldChanging: 'end',
        end: value
      })
    }
  })

  return (
    <>
      <FormField
        control={control}
        name='date.from'
        render={({ field }) => {
          return (
            <FormItem>
              <DatePickerWithPresets
                date={field.value}
                setDate={(date) => {
                  field.onChange(date) // <-- This is essential
                }}
                min={min}
                max={max}
                onDayBlur={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )
        }}
      />

      <FormField
        control={control}
        name='date.to'
        render={({ field }) => {
          return (
            <FormItem>
              <DatePickerWithPresets
                date={field.value}
                setDate={(date) => {
                  field.onChange(date) // <-- This is essential
                }}
                min={min}
                max={max}
                onDayBlur={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </>
  )
}

export default UpdateDateIssue
