import { DatePickerWithPresets } from '@/components/ui/date-picker'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import useSprintActive from '@/hooks/use-sprint-active'
import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { useFormContext } from 'react-hook-form'

const UpdateDateIssue = () => {
  const { sprint } = useSprintActive()
  const min = sprint?.start ?? undefined
  const max = sprint?.end ?? undefined
  const date = undefined

  const form = useFormContext<UpdateIssueType>()

  const { control, getValues } = form

  useAutoUpdateField({
    form: form,
    field: 'date.from',
    isPause: (_, value) => {
      return value == undefined
    },
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
    isPause: (_, value) => {
      return value == undefined
    },
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
                date={field.value ?? date}
                min={min}
                max={max}
                onDayBlur={(date) => {
                  if (date) {
                    field.onChange(date)
                  }
                }}
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
                date={field.value ?? max}
                min={min}
                max={max}
                onDayBlur={(date) => {
                  if (date) {
                    field.onChange(date)
                  }
                }}
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
