import { FormField } from '@/components/ui/form'
import * as TagsInput from '@diceui/tags-input'

import Empty from '@/components/Empty'
import InlineEdit from '@/components/InlineEdit'
import ListView from '@/components/ListView'
import TitleLevel from '@/components/TitleLevel'
import { Badge } from '@/components/ui/badge'
import messages from '@/constant/message.const'
import { useAutoUpdateField } from '@/hooks/use-update'
import { uuid } from '@/lib/utils'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import { Id } from '@/types/other.type'
import { useFormContext } from 'react-hook-form'
type UpdateTopicProps = {}

const UpdateTopicForm = ({}: UpdateTopicProps) => {
  const message = messages.component.issue
  const form = useFormContext<UpdateIssueType>()
  const { control, getValues, setValue } = form

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

  return (
    <FormField
      control={control}
      name='topics'
      render={({ field }) => {
        return (
          <InlineEdit<
            {
              name: string
              id: Id
            }[]
          >
            value={field.value ?? []}
            onSave={(val) => {
              setValue(
                'topics',
                val.map((item) => ({
                  id: item.id,
                  name: item.name
                }))
              )
            }}
            className='w-full'
            displayComponent={(value) => {
              return (
                <ListView
                  data={value}
                  emptyComponent={
                    <Empty className='mt-2 h-[50px]'>
                      Không có topic được gán
                    </Empty>
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
                />
              )
            }}
            renderEditor={({ value, onChange, onBlur, ref }) => (
              <TagsInput.Root
                ref={ref}
                value={value.map((item) => item.name)}
                onValueChange={(value) =>
                  onChange(
                    value.map((item) => ({
                      id: uuid(),
                      name: item
                    }))
                  )
                }
                className='mr-2 flex w-full flex-col gap-2'
                editable
                onBlur={onBlur}
              >
                <TagsInput.Label className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  <TitleLevel level={'lv-4'}>{message.topic}</TitleLevel>
                </TagsInput.Label>
                <div className='border-input bg-background flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border px-3 py-2 text-sm focus-within:ring-1 focus-within:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-within:ring-zinc-400'>
                  {value.map((topic) => (
                    <TagsInput.Item
                      key={topic.id}
                      value={topic.name}
                      className='inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-editable:select-none data-editing:bg-transparent data-editing:ring-1 data-editing:ring-zinc-500 dark:data-editing:ring-zinc-400 [&:not([data-editing])]:pr-1.5 [&[data-highlighted]:not([data-editing])]:bg-zinc-200 [&[data-highlighted]:not([data-editing])]:text-black dark:[&[data-highlighted]:not([data-editing])]:bg-zinc-800 dark:[&[data-highlighted]:not([data-editing])]:text-white'
                    >
                      <TagsInput.ItemText className='truncate' />
                    </TagsInput.Item>
                  ))}
                  <TagsInput.Input
                    placeholder={message.topic}
                    className='flex-1 bg-transparent outline-hidden placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400'
                  />
                </div>
              </TagsInput.Root>
            )}
          />
        )
      }}
    />
  )
}

export default UpdateTopicForm
