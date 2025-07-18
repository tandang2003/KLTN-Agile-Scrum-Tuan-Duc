import InlineEdit from '@/components/InlineEdit'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdateIssueMutation } from '@/feature/issue/issue.api'
import { useAutoUpdateField } from '@/hooks/use-update'
import { UpdateIssueType } from '@/types/issue.type'
import { useFormContext } from 'react-hook-form'
type UpdateNameIssueProps = {}

const UpdateNameIssue = ({}: UpdateNameIssueProps) => {
  const form = useFormContext<UpdateIssueType>()
  const { control, setValue, getValues } = form
  const [update] = useUpdateIssueMutation()
  useAutoUpdateField({
    form: form,
    field: 'name',
    callApi: (field, value) => {
      return update({
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
