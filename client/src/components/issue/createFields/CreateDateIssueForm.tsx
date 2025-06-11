import { DatePickerWithPresets } from '@/components/ui/date-picker'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { CreateIssueType } from '@/types/issue.type'
import { useFormContext } from 'react-hook-form'

const CreateDateIssueForm = () => {
  const { control, getValues } = useFormContext<CreateIssueType>()
  const sprintCurrent = getValues('sprint')
  return (
    <>
      <FormField
        control={control}
        name='date.from'
        render={({ field }) => (
          <FormItem className=''>
            <FormLabel>Time start</FormLabel>
            <DatePickerWithPresets
              min={
                sprintCurrent?.start ? new Date(sprintCurrent.start) : undefined
              }
              max={sprintCurrent?.end ? new Date(sprintCurrent.end) : undefined}
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
            <FormItem className=''>
              <FormLabel>Time end</FormLabel>
              <DatePickerWithPresets
                date={field.value}
                min={
                  sprintCurrent?.start
                    ? new Date(sprintCurrent.start)
                    : undefined
                }
                max={
                  sprintCurrent?.end ? new Date(sprintCurrent.end) : undefined
                }
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
