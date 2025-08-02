import ToolTip from '@/components/Tooltip'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import messages from '@/constant/message.const'
import { useAppSelector } from '@/context/redux/hook'
import { useGetMembersQuery } from '@/feature/issue/issue.api'

import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
import {
  UpdateIssueRequest,
  UpdateIssueType,
  UserSuitableResponse
} from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { useEffect, useState } from 'react'
import { Path, PathValue, UseFormReturn } from 'react-hook-form'

type FieldKey = Path<UpdateIssueType>
type FieldName =
  | Extract<FieldKey, 'assigneeId'>
  | Extract<FieldKey, 'reviewerId'>

type SelectMemberProps = {
  form: UseFormReturn<UpdateIssueType>
  name: FieldName
  label?: string
}

const UpdateMemberIssue = ({ form, name, label }: SelectMemberProps) => {
  const id = useAppSelector((state) => state.issueSlice.current?.id)
  const message = messages.component.issue
  const { data } = useGetMembersQuery(id as Id, {
    skip: !id
  })

  const { getValues, control } = form
  const totalTopic = getValues('topics')?.length || 0
  const notShowId = getValues(
    name == 'assigneeId' ? 'reviewerId' : 'assigneeId'
  )

  const callApi: (
    field: FieldName,
    value: PathValue<UpdateIssueType, FieldName>
  ) => Promise<any> | undefined = (field, value) => {
    let selectedValue = value !== 'null' ? value : undefined
    let req: UpdateIssueRequest
    if (field == 'assigneeId')
      req = {
        id: getValues('id'),
        fieldChanging: 'assignee',
        assignee: selectedValue
      }
    else
      req = {
        id: getValues('id'),
        fieldChanging: 'reviewer',
        reviewer: selectedValue
      }
    return issueService.updateIssue(req)
  }

  useAutoUpdateField({
    form: form,
    field: name,
    callApi: callApi
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
                <SelectValue placeholder={message.select.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value='null'>{message.select.null}</SelectItem>
              {data
                ?.filter((item) => item.id != notShowId)
                ?.map((item) => (
                  <SelectItemWithValue
                    key={item.id}
                    data={item}
                    totalTopic={totalTopic}
                  />
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
type SelectItemWithValueProps = {
  data: UserSuitableResponse
  totalTopic: number
}

const SelectItemWithValue = ({
  data,
  totalTopic
}: SelectItemWithValueProps) => {
  const { id, name, skills } = data

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const matcher = skills.reduce<number>(
      (prev, current) => prev + current.proficiency,
      0
    )
    const total = totalTopic * 5
    const result = Math.round((matcher / total) * 100) ?? 0

    const timer = setTimeout(() => setProgress(result), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SelectItem key={id} value={id}>
      <div>
        <ToolTip trigger={<div>{name}</div>}>{id}</ToolTip>
        <Progress value={progress} className='mt-2' />
      </div>
    </SelectItem>
  )
}

export default UpdateMemberIssue
