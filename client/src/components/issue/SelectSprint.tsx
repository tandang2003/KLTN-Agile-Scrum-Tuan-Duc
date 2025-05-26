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
import { Control } from 'react-hook-form'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import { Id } from '@/types/other.type'
type SelectSprintProps = {
  control: Control<any>
  name: string
  label?: string
}

const SelectSprint = ({ control, name, label }: SelectSprintProps) => {
  const { workspaceId } = useAppId()

  const { data } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || name}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value)
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a member' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={null!}>Not assign</SelectItem>
              {data?.map((item, index) => {
                return (
                  <SelectItem key={item.id} value={item.id}>
                    <span>
                      {index + 1} - {item.title}
                    </span>
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

export default SelectSprint
