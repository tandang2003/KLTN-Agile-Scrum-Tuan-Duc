import Editor from '@/components/Editor'
import HtmlViewer from '@/components/HtmlViewer'
import InlineEdit from '@/components/InlineEdit'
import { FormField } from '@/components/ui/form'
import messages from '@/constant/message.const'
import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { useFormContext } from 'react-hook-form'

type UpdateDescriptionIssueProps = {}

const UpdateDescriptionIssue = ({}: UpdateDescriptionIssueProps) => {
  const form = useFormContext<UpdateIssueType>()
  const { control, setValue, getValues } = form

  useAutoUpdateField({
    form: form,
    field: 'description',
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
      name='description'
      render={({ field }) => {
        return (
          <InlineEdit<string>
            value={field.value ?? ''}
            onSave={(val) => {
              setValue('description', val)
            }}
            className='block'
            displayComponent={(value) => {
              return (
                <HtmlViewer
                  className='rounded-md border-2 px-2 py-3 text-base'
                  value={value}
                  fallback={
                    messages.component.issue.update.form.descriptionFallback
                  }
                />
              )
            }}
            renderEditor={({ value, onChange, onBlur, ref }) => (
              <Editor
                className='h-full'
                value={value}
                ref={ref}
                onChange={(_, __, ___, editor) => onChange(editor.getHTML())}
                onBlur={onBlur}
              />
            )}
          />
        )
      }}
    />
  )
}

export default UpdateDescriptionIssue
