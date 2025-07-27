import Editor from '@/components/Editor'
import TitleLevel from '@/components/TitleLevel'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import messages, { getComplexOfDescriptionName } from '@/constant/message.const'
import { CreateIssueType } from '@/types/issue.type'
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
import { useEffect, useRef } from 'react'
import { getComplexityBilingual } from '@/lib/issue.helper'

type CreateDescriptionProps = {}

const CreateDescriptionForm = ({}: CreateDescriptionProps) => {
  const message = messages.component.issue
  const isFirstRun = useRef<boolean>(true)

  const form = useFormContext<CreateIssueType>()
  const { control, watch, setValue } = form
  const watchDescription = watch('description')

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    const handler = setTimeout(() => {
      console.log('desc')
      setValue(
        'complexOfDescription',
        getComplexityBilingual(watchDescription ?? '')
      )
    }, 500) // debounce delay in milliseconds

    return () => {
      clearTimeout(handler)
    }
  }, [watchDescription, setValue])

  return (
    <FormField
      control={control}
      name='description'
      render={({ field }) => (
        <FormItem className='mt-4'>
          <FormLabel className='flex justify-between'>
            <TitleLevel level={'lv-2'}>{message.description}</TitleLevel>
            <p className='flex items-center gap-2 rounded-md border-2 p-2'>
              Độ khó:
              <ComplexDescriptionSelect />
            </p>
          </FormLabel>

          <FormControl>
            <Editor
              className='h-full'
              {...field}
              classNameContainer='h-[200px] rounded-md border shadow-sm'
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

const ComplexDescriptionSelect = () => {
  const form = useFormContext<CreateIssueType>()
  const { control } = form

  return (
    <FormField
      control={control}
      name={'complexOfDescription'}
      render={({ field }) => {
        return (
          <Select
            defaultValue='1'
            value={field.value?.toString() ?? '1'}
            onValueChange={field.onChange}
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

export default CreateDescriptionForm
