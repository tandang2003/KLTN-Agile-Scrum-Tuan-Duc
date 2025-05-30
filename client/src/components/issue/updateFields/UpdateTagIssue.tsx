import { FormControl, FormField } from '@/components/ui/form'
import { ReactNode } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { UpdateIssueType } from '@/types/issue.type'
import { issueTagList } from '@/types/model/typeOf'

const UpdateTagIssue = () => {
  const form = useFormContext<UpdateIssueType>()
  const { control } = form
  return (
    <FormField
      control={form.control}
      name='tag'
      render={({ field }) => {
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a priority' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {issueTagList.map((item, index) => {
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

export default UpdateTagIssue
