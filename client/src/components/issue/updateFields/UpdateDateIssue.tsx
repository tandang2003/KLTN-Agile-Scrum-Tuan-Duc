import { DatePickerWithPresets } from '@/components/ui/date-picker'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import useSprintActive from '@/hooks/use-sprint-active'
import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { useFormContext } from 'react-hook-form'

const UpdateDateIssue = () => {
  const { sprint } = useSprintActive()
  console.log('sprint active', sprint)
  if (!sprint) return null
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
    <div className=''>
      <FormField
        control={control}
        name='date.from'
        render={({ field }) => {
          return (
            <FormItem>
              <DatePickerWithPresets
                date={field.value}
                min={sprint.start}
                max={sprint.end}
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
            <FormItem className='mt-2'>
              <DatePickerWithPresets
                date={field.value}
                min={sprint.start}
                max={sprint.end}
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
    </div>
  )
}

export default UpdateDateIssue
