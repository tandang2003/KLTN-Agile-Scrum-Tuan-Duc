import { FormControl, FormField } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { issuePriorityList } from '@/types/model/typeOf'
import { useFormContext } from 'react-hook-form'
type UpdatePriorityIssueProps = {}

const UpdatePriorityIssue = ({}: UpdatePriorityIssueProps) => {
  const form = useFormContext<UpdateIssueType>()
  const { control, getValues } = form

  useAutoUpdateField({
    form: form,
    field: 'priority',
    callApi: (field, value) => {
      return issueService.updateIssue({
        id: getValues('id'),
        fieldChanging: field,
        [field]: value
      })
    }
  })

  return (
    <FormField
      control={control}
      name='priority'
      render={({ field }) => {
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a priority' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {issuePriorityList.map((item, index) => {
                return (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        )
      }}
    />
  )
}

export default UpdatePriorityIssue
