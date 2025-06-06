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
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import { stringToDate } from '@/types/common.type'
import { CreateIssueType } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { useFormContext, UseFormReturn } from 'react-hook-form'
type SelectSprintProps = {
  label?: string
}

const SelectSprint = ({ label }: SelectSprintProps) => {
  const { workspaceId } = useAppId()
  const form = useFormContext<CreateIssueType>()
  const { control, setValue } = form
  const { data } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  return (
    <FormField
      control={control}
      name='sprintId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value)
              if (!value) {
                setValue('sprint', undefined)
                return
              }
              const start = data?.find((item) => item.id === value)?.start
              const end = data?.find((item) => item.id === value)?.end
              const sprint = {
                id: value,
                start: start,
                end: end
              }
              setValue('sprint', sprint)
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
