import { DatePickerWithRange } from '@/components/ui/date-picker'
import { FormField } from '@/components/ui/form'
import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useFormContext } from 'react-hook-form'

const UpdateDateIssue = () => {
  const form = useFormContext<UpdateIssueType>()

  const { control, getValues, setValue } = form

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const data = getValues('date')
    if (data) {
      return {
        from: data?.from,
        to: data?.to
      }
    }
    return undefined
  })

  useAutoUpdateField({
    form: form,
    field: 'date',
    condition: (field, value) => {
      return value != undefined
    },
    callApi: (field, value) => {
      return Promise.all([
        issueService.updateIssue({
          id: getValues('id'),
          fieldChanging: 'start',
          start: value?.to
        }),
        issueService.updateIssue({
          id: getValues('id'),
          fieldChanging: field,
          end: value?.to
        })
      ])
    }
  })

  const handleOpenCalender = (open: boolean) => {
    if (open == false)
      if (date?.from && date.to)
        setValue(
          'date',
          {
            from: date.from,
            to: date.to
          },
          { shouldValidate: true }
        )
  }

  return (
    <FormField
      control={control}
      name='date'
      render={({ field }) => {
        return (
          <DatePickerWithRange
            date={date}
            setDate={setDate}
            onOpen={(open) => handleOpenCalender(open)}
          />
        )
      }}
    />
  )
}

export default UpdateDateIssue
