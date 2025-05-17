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
          <FormLabel>{label || name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a verified email to display' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data?.map((item) => {
                return <SelectItem value={item.id}>{item.name}</SelectItem>
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
