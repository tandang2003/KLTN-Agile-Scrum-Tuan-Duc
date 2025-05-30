import InlineEdit from '@/components/InlineEdit'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAppId from '@/hooks/use-app-id'
import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
type UpdateNameIssueProps = {
  children: ReactNode
}

const UpdateNameIssue = () => {
  const form = useFormContext<UpdateIssueType>()
  const { control, setValue, getValues } = form
  useAutoUpdateField({
    form: form,
    field: 'name',
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
      name='name'
      render={({ field }) => {
        return (
          <InlineEdit<string | undefined>
            value={field.value}
            onSave={(val) => {
              setValue('name', val, { shouldValidate: true })
            }}
            displayComponent={(value) => <h1 className='text-2xl'>{value}</h1>}
            renderEditor={({ value, onChange, onBlur, ref, onKeyDown }) => (
              <Input
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                className='placeholder:text-xl'
              />
            )}
          />
        )
      }}
    />
  )
}

export default UpdateNameIssue
