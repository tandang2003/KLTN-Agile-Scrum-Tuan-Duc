import TitleLevel from '@/components/issue/TitleLevel'
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
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import useAppId from '@/hooks/use-app-id'
import { CreateIssueType } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { isBefore } from 'date-fns'
import { useFormContext } from 'react-hook-form'
type SelectSprintProps = {}

const SelectSprint = ({}: SelectSprintProps) => {
  const message = messages.component.issue.create
  const { workspaceId } = useAppId()
  const form = useFormContext<CreateIssueType>()
  const { control, setValue } = form
  const { data } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  const { data: workspace } = useGetWorkspaceQuery(workspaceId as Id, {
    skip: !workspaceId
  })

  const handleSelectSprint = (value: Id) => {
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
  }

  return (
    <FormField
      control={control}
      name='sprintId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <TitleLevel level={'lv-2'}>{message.form.sprint.label}</TitleLevel>
          </FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value)
              handleSelectSprint(value)
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={message.form.sprint.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={null!}>{message.form.sprint.null}</SelectItem>
              {data?.map((item, index) => {
                const isDisabled = workspace?.currentSprint
                  ? isBefore(item.start, workspace.currentSprint.start)
                  : false
                return (
                  <SelectItem
                    key={item.id}
                    value={item.id}
                    disabled={isDisabled}
                  >
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
