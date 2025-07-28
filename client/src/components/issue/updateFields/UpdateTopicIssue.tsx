import { FormField } from '@/components/ui/form'
import * as TagsInput from '@diceui/tags-input'

import Empty from '@/components/Empty'
import Icon from '@/components/Icon'
import ListView from '@/components/ListView'
import TitleLevel from '@/components/TitleLevel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import messages from '@/constant/message.const'
import { useAutoUpdateField } from '@/hooks/use-update'
import { uuid } from '@/lib/utils'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
type UpdateTopicProps = {}

const UpdateTopicForm = ({}: UpdateTopicProps) => {
  const message = messages.component.issue
  const form = useFormContext<UpdateIssueType>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { control, getValues, setValue } = form

  const fields = getValues('topics')
  const [topics, setTopics] = useState<string[]>(
    fields?.map((item) => {
      return item.name
    }) ?? []
  )
  const data = fields?.map((item) => {
    return {
      id: item.id,
      name: item.name
    }
  })

  useAutoUpdateField({
    form: form,
    field: 'topics',
    callApi: (_, value) => {
      return issueService.updateIssue({
        id: getValues('id'),
        fieldChanging: 'topics',
        topics:
          value?.map((item) => {
            return {
              id: item.id,
              name: item.name,
              color: ''
            }
          }) ?? []
      })
    }
  })

  const handleAddTopic = () => {
    const dataSet = topics.map((topic) => {
      const exist = data?.find((item) => item.name === topic)
      if (exist) {
        return {
          id: exist.id,
          name: exist.name
        }
      } else {
        return {
          id: uuid(),
          name: topic
        }
      }
    })
    setIsEdit(false)
    setValue('topics', dataSet)
  }

  return (
    <FormField
      control={control}
      name='topics'
      render={() => {
        if (isEdit)
          return (
            <TagsInput.Root
              value={topics}
              onValueChange={setTopics}
              className='mr-2 flex w-full flex-col gap-2'
              editable
            >
              <TagsInput.Label className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                <TitleLevel level={'lv-4'}>{message.topic}</TitleLevel>
              </TagsInput.Label>
              <div className='border-input bg-background flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border px-3 py-2 text-sm focus-within:ring-1 focus-within:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-within:ring-zinc-400'>
                {topics.map((topic) => (
                  <TagsInput.Item
                    key={topic}
                    value={topic}
                    className='inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-editable:select-none data-editing:bg-transparent data-editing:ring-1 data-editing:ring-zinc-500 dark:data-editing:ring-zinc-400 [&:not([data-editing])]:pr-1.5 [&[data-highlighted]:not([data-editing])]:bg-zinc-200 [&[data-highlighted]:not([data-editing])]:text-black dark:[&[data-highlighted]:not([data-editing])]:bg-zinc-800 dark:[&[data-highlighted]:not([data-editing])]:text-white'
                  >
                    <TagsInput.ItemText className='truncate' />
                    <TagsInput.ItemDelete className='h-4 w-4 shrink-0 rounded-sm opacity-70 ring-offset-zinc-950 transition-opacity hover:opacity-100'>
                      <X className='h-3.5 w-3.5' />
                    </TagsInput.ItemDelete>
                  </TagsInput.Item>
                ))}
                <TagsInput.Input
                  placeholder={message.topic}
                  className='flex-1 bg-transparent outline-hidden placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400'
                />
              </div>
              <div className='flex h-9 items-center justify-center gap-2 rounded-sm border bg-transparent text-zinc-800 shadow-xs dark:text-zinc-300'>
                <Button
                  type='button'
                  className='cancel flex-1'
                  onClick={() => setIsEdit(false)}
                >
                  Hủy
                </Button>
                <Button
                  type='button'
                  className='success flex-1'
                  onClick={() => handleAddTopic()}
                >
                  Chấp nhận
                </Button>
              </div>
            </TagsInput.Root>
          )
        else {
          return (
            <ListView
              data={data}
              emptyComponent={
                <Empty className='mt-2'>Không có topic được gán</Empty>
              }
              orientation='horizontal'
              className='gap-2 rounded-xl border-2 p-2'
              render={(item) => {
                return (
                  <Badge key={item.id} className={item.id}>
                    {item.name}
                  </Badge>
                )
              }}
              append={
                <Icon
                  className='hover-opacity'
                  icon={'material-symbols:edit-outline'}
                  onClick={() => {
                    setIsEdit(true)
                  }}
                />
              }
            />
          )
        }
      }}
    />
  )
}

export default UpdateTopicForm
