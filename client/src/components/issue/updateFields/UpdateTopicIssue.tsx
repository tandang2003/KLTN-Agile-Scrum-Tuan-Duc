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
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { TopicModel } from '@/types/model/common.model'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  BaseIssueFormType,
  TopicModelType,
  UpdateIssueRequest,
  UpdateIssueType
} from '@/types/issue.type'
import { useRef, useState } from 'react'
import { useCommandState } from 'cmdk'
import { Button } from '@/components/ui/button'
import { useAutoUpdateField } from '@/hooks/use-update'
import issueService from '@/services/issue.service'
type UpdateTopicProps = {}

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

const UpdateTopicForm = ({}: UpdateTopicProps) => {
  const form = useFormContext<UpdateIssueType>()
  const popoverOpenRef = useRef<boolean>(false)

  const { control } = form

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'topics',
    keyName: 'fieldId'
  })
  const [data, setData] = useState<TopicModelType[]>(fields)
  const [selecteds, setSelecteds] = useState<TopicModelType[]>(fields)

  useAutoUpdateField({
    form: form,
    field: 'topics',
    isPause: (field, value) => {
      console.log(popoverOpenRef)
      if (popoverOpenRef.current) return true
      console.log(field, value)
      return false
    }
  })

  return (
    <FormField
      control={control}
      name='topics'
      render={() => {
        return (
          <Popover onOpenChange={(open) => (popoverOpenRef.current = open)}>
            <PopoverTrigger className='flex w-full justify-start rounded border px-4 py-2 shadow-md [&>*:not(:first-child)]:ml-2'>
              {fields.length ? (
                fields.map((item) => {
                  return (
                    <Badge key={item.id} className='inline-block'>
                      {item.name}
                    </Badge>
                  )
                })
              ) : (
                <span>Topic</span>
              )}
            </PopoverTrigger>
            <PopoverContent align='start' className='w-72 p-0'>
              <Command
                filter={(value, search) => {
                  if (value.includes(search)) return 1
                  return 0
                }}
              >
                <CommandInput placeholder='Search items...' />
                <CommandCreateButton />
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
        )
      }}
    />
  )
}

const CommandCreateButton = () => {
  const search = useCommandState((state) => state.search)
  return (
    <CommandEmpty
      className='hover:bg-accent flex px-1.5 py-2 pl-8 hover:cursor-pointer'
      onClick={() => console.log('hello')}
    >
      <div>{search}</div>
    </CommandEmpty>
  )
}

export default UpdateTopicForm
