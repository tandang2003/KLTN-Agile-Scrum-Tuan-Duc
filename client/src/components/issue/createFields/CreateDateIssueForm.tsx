import { DatePickerWithPresets } from '@/components/ui/date-picker'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import messages from '@/constant/message.const'
import { CreateIssueType } from '@/types/issue.type'
import { useFormContext } from 'react-hook-form'

const CreateDateIssueForm = () => {
  const message = messages.component.issue.create.form
  const { control, watch } = useFormContext<CreateIssueType>()

  const sprint = watch('sprint')

  return (
    <>
      <FormField
        control={control}
        name='date.from'
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>{message.dateStart}</FormLabel>
            <DatePickerWithPresets
              min={sprint?.start ? new Date(sprint.start) : undefined}
              max={sprint?.end ? new Date(sprint.end) : undefined}
              date={field.value}
              setDate={(date) => {
                if (date) {
                  field.onChange(date)
                }
              }}
            />
            <div className='h-[20px]'>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='date.to'
        render={({ field }) => {
          return (
            <FormItem className='flex-1'>
              <FormLabel>{message.dateEnd}</FormLabel>
              <DatePickerWithPresets
                date={field.value}
                min={sprint?.start ? new Date(sprint.start) : undefined}
                max={sprint?.end ? new Date(sprint.end) : undefined}
                setDate={(date) => {
                  if (date) {
                    field.onChange(date)
                  }
                }}
              />
              <div className='h-[20px]'>
                <FormMessage />
              </div>
            </FormItem>
          )
        }}
      />
    </>
  )
}

export default CreateDateIssueForm
