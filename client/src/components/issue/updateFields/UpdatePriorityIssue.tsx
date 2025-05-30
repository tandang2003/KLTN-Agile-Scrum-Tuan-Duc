import { FormControl, FormField } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { UpdateIssueType } from '@/types/issue.type'
import { issuePriorityList } from '@/types/model/typeOf'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
type UpdatePriorityIssueProps = {
  children: ReactNode
}

const UpdatePriorityIssue = () => {
  const form = useFormContext<UpdateIssueType>()
  const { control } = form

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
