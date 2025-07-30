import Editor from '@/components/Editor'
import HtmlViewer from '@/components/HtmlViewer'
import InlineEdit from '@/components/InlineEdit'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import messages, { getComplexOfDescriptionName } from '@/constant/message.const'
import { useAutoUpdateField } from '@/hooks/use-update'
import { getComplexityBilingual } from '@/lib/issue.helper'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { useFormContext } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  ComplexOfDescription,
  complexOfDescriptionList
} from '@/types/model/typeOf'
import TitleLevel from '@/components/TitleLevel'
type UpdateDescriptionIssueProps = {}

const UpdateDescriptionIssue = ({}: UpdateDescriptionIssueProps) => {
  const message = messages.component.issue
  const form = useFormContext<UpdateIssueType>()
  const { control, setValue, getValues } = form

  useAutoUpdateField({
    form: form,
    field: 'description',
    callApi: (field, value) => {
      return issueService
        .updateIssue({
          id: getValues('id'),
          fieldChanging: field,
          [field]: value
        })
        .then(() => {
          issueService.updateIssue({
            id: getValues('id'),
            fieldChanging: 'complexOfDescription',
            complexOfDescription: getComplexityBilingual(value ?? '')
          })
        })
    }
  })
  return (
    <FormField
      control={control}
      name='description'
      render={({ field }) => {
        return (
          <FormItem className='mt-4'>
            <FormLabel className='flex justify-between'>
              <TitleLevel level={'lv-2'}>{message.description}</TitleLevel>
              <p className='flex items-center gap-2 rounded-md border-2 p-2'>
                Độ khó:
                <ComplexDescriptionSelect />
              </p>
            </FormLabel>
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
          </FormItem>
        )
      }}
    />
  )
}

const ComplexDescriptionSelect = () => {
  const form = useFormContext<UpdateIssueType>()
  const { control, getValues } = form

  useAutoUpdateField({
    form: form,
    field: 'complexOfDescription',
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
      name={'complexOfDescription'}
      render={({ field }) => {
        return (
          <Select
            defaultValue='1'
            value={field.value?.toString() ?? '1'}
            onValueChange={(value)=> field.onChange(Number(value))}
          >
            <SelectTrigger className='w-[120px]'>
              <SelectValue placeholder='Độ khó' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {complexOfDescriptionList.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={ComplexOfDescription[item].toString()}
                  >
                    {getComplexOfDescriptionName(ComplexOfDescription[item])}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )
      }}
    />
  )
}

export default UpdateDescriptionIssue
