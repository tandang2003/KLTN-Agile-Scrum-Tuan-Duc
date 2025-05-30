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
import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
import { UpdateIssueRequest, UpdateIssueType } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { UseFormReturn, Path, FieldValue, PathValue } from 'react-hook-form'

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
  const { projectId } = useAppId()
  const { data } = useGetMembersQuery(projectId as Id, {
    skip: !projectId
  })

  const { getValues, control } = form

  const callApi: (
    field: FieldName,
    value: PathValue<UpdateIssueType, FieldName>
  ) => Promise<any> | undefined = (field, value) => {
    let req: UpdateIssueRequest
    if (field == 'assigneeId')
      req = {
        id: getValues('id'),
        fieldChanging: 'assignee',
        assignee: value
      }
    else
      req = {
        id: getValues('id'),
        fieldChanging: 'reviewer',
        reviewer: value
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
                <SelectValue placeholder='Select a member' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={null!}>Not assign</SelectItem>
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

export default UpdateMemberIssue
