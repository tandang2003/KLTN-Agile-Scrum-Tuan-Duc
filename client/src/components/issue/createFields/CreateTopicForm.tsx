import { FormField } from '@/components/ui/form'
import * as TagsInput from '@diceui/tags-input'

import messages from '@/constant/message.const'
import { uuid } from '@/lib/utils'
import { BaseIssueFormType } from '@/types/issue.type'
import { RefreshCcw, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import TitleLevel from '@/components/issue/TitleLevel'
type CreateTopicProps = {}

const CreateTopicForm = ({}: CreateTopicProps) => {
  const message = messages.component.issue
  const { control } = useFormContext<BaseIssueFormType>()
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'topics'
  })

  const [topics, setTopics] = useState<string[]>([])

  useEffect(() => {
    const fieldNames = fields.map((f) => f.name)

    topics.forEach((topic) => {
      if (!fieldNames.includes(topic)) {
        append({
          id: uuid(),
          name: topic
        })
      }
    })

    fieldNames.forEach((name, index) => {
      if (!topics.includes(name)) {
        remove(index)
      }
    })
  }, [topics])

  return (
    <>
      <FormField
        control={control}
        name='topics'
        render={() => {
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
                  placeholder='Add trick...'
                  className='flex-1 bg-transparent outline-hidden placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400'
                />
              </div>
              <TagsInput.Clear className='border-input flex h-9 items-center justify-center gap-2 rounded-sm border bg-transparent text-zinc-800 shadow-xs hover:bg-zinc-100/80 dark:text-zinc-300 dark:hover:bg-zinc-900/80'>
                <RefreshCcw className='h-4 w-4' />
                Xóa
              </TagsInput.Clear>
            </TagsInput.Root>
          )
        }}
      />
    </>
  )
}

export default CreateTopicForm
