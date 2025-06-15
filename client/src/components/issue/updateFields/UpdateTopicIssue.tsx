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
import { useAutoUpdateField } from '@/hooks/use-update'
import { cn, uuid } from '@/lib/utils'
import issueService from '@/services/issue.service'
import { TopicModelType, UpdateIssueType } from '@/types/issue.type'
import { useCommandState } from 'cmdk'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
type UpdateTopicProps = {}

const UpdateTopicForm = ({}: UpdateTopicProps) => {
  const form = useFormContext<UpdateIssueType>()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { control, getValues } = form

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'topics'
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState<TopicModelType[]>(
    fields.map((item) => {
      return {
        id: item.id,
        name: item.name
      }
    })
  )

  const [selecteds, setSelecteds] = useState<TopicModelType[]>(
    ...[
      fields.map((item) => {
        return {
          id: item.id,
          name: item.name
        }
      })
    ]
  )

  useAutoUpdateField({
    form: form,
    field: 'topics',
    deps: [isPopoverOpen],
    isPause: (_, __) => {
      return isPopoverOpen
    },
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

  const handleAddTopic = (field: TopicModelType) => {
    setData((prev) => [...prev, field])
    setSelecteds((prev) => [...prev, field])
    append({
      id: field.id,
      name: field.name
    })
    setSearchTerm?.('')
  }
  // useEffect(() => {
  //   console.log('isPopoverOpen', isPopoverOpen)
  // }, [isPopoverOpen])
  return (
    <FormField
      control={control}
      name='topics'
      render={() => {
        return (
          <Popover onOpenChange={(open) => setIsPopoverOpen(open)}>
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
                <CommandInput
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  placeholder='Search items...'
                />
                <CommandCreateButton
                  onAddTopic={(field) => {
                    handleAddTopic(field)
                  }}
                />
                <CommandList>
                  {data.map((item) => {
                    const isSelected = selecteds
                      .map((field) => field.name)
                      .includes(item.name)
                    return (
                      <CommandItem
                        key={item.id}
                        value={item.name}
                        onSelect={(value) => {
                          const index = fields.findIndex(
                            (field) => field.name === value
                          )
                          if (index > -1) {
                            setSelecteds((prev) => [
                              ...prev.filter((field) => field.name !== value)
                            ])
                            remove(index)
                          } else {
                            const selected = data.find(
                              (topic) => topic.name === value
                            )
                            if (selected) {
                              setSelecteds((prev) => [
                                ...prev,
                                {
                                  id: selected.id,
                                  name: selected.name
                                }
                              ])

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

type CommandCreateButtonProps = {
  onAddTopic(topic: TopicModelType): void
}
const CommandCreateButton = ({ onAddTopic }: CommandCreateButtonProps) => {
  const search = useCommandState((state) => state.search)

  return (
    <CommandEmpty
      className='hover:bg-accent flex px-1.5 py-2 pl-8 hover:cursor-pointer'
      onClick={() => {
        const field = {
          id: uuid(),
          name: search
        }
        onAddTopic(field)
      }}
    >
      <div>{search}</div>
    </CommandEmpty>
  )
}

export default UpdateTopicForm
