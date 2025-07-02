import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import messages from '@/constant/message.const'
import { useGetMembersQuery } from '@/feature/project/project.api'
import useAppId from '@/hooks/use-app-id'
import { Id } from '@/types/other.type'
import { Control } from 'react-hook-form'
type SelectMemberProps = {
  control: Control<any>
  name: string
  label?: string
}

const SelectMember = ({ control, name, label }: SelectMemberProps) => {
  const { projectId } = useAppId()
  const { data } = useGetMembersQuery(projectId as Id, {
    skip: !projectId
  })
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder={
                    messages.component.issue.create.form.select.placeholder
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={null!}>
                {messages.component.issue.create.form.select.null}
              </SelectItem>
              {data?.map((item) => {
                return (
                  <SelectItem key={item.id} value={item.uniId}>
                    {item.name}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectMember
