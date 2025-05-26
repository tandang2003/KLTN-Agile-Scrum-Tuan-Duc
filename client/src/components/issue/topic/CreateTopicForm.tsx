import { FormField } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { TopicModel } from '@/types/model/common.model'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { BaseIssueFormType } from '@/types/issue.type'
type CreateTopicProps = {}

const topicData: TopicModel[] = [
  {
    id: '1',
    name: 'SQL'
  },
  {
    id: '2',
    name: 'JAVA'
  },
  {
    id: '3',
    name: 'TYPESCRIPT'
  }
]

const CreateTopicForm = ({}: CreateTopicProps) => {
  const { control } = useFormContext<BaseIssueFormType>()
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'topics',
    keyName: 'fieldId'
  })
  useEffect(() => {
    console.log(fields)
    console.log(fields.map((field) => field.id))
  }, [fields])

  return (
    <>
      <FormField
        control={control}
        name='topics'
        render={() => {
          return (
            <div className='flex'>
              <Popover>
                <PopoverTrigger className='w-full rounded border px-4 py-2 [&>*:not(:first-child)]:ml-2'>
                  {fields.length ? (
                    fields.map((item) => {
                      return <Badge className='inline-block'>{item.name}</Badge>
                    })
                  ) : (
                    <span>Topic</span>
                  )}
                </PopoverTrigger>
                <PopoverContent align='start' className='w-72 p-0'>
                  <Command>
                    <CommandInput placeholder='Search items...' />
                    <CommandList>
                      {topicData.map((item) => {
                        const isSelected = fields
                          .map((field) => field.id)
                          .includes(item.id)
                        return (
                          <CommandItem
                            key={item.id}
                            value={item.id}
                            onSelect={(value) => {
                              const index = fields.findIndex(
                                (field) => field.id === value
                              )
                              if (index > -1) {
                                remove(index)
                              } else {
                                const selected = topicData.find(
                                  (topic) => topic.id === value
                                )
                                if (selected) {
                                  append({
                                    id: selected.id,
                                    name: selected.name
                                  })
                                }
                              }
                            }}
                          >
                            <Icon
                              icon={'material-symbols:check'}
                              className={cn(
                                'text-black',
                                isSelected ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {item.name}
                          </CommandItem>
                        )
                      })}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )
        }}
      />
    </>
  )
}

export default CreateTopicForm
