import Icon from '@/components/Icon'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { CSS } from '@dnd-kit/utilities'

import { FormControl, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAutoUpdateField } from '@/hooks/use-update'
import { cn } from '@/lib/utils'
import issueService from '@/services/issue.service'
import { UpdateIssueType } from '@/types/issue.type'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { forwardRef, useRef, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import messages from '@/constant/message.const'
import TitleLevel from '@/components/TitleLevel'

type UpdateSubTaskFormProp = {}

const UpdateSubTaskForm = ({}: UpdateSubTaskFormProp) => {
  const orderRef = useRef<number>(0)
  const [open, setOpen] = useState<boolean>(false)

  const message = messages.component.issue.subTasks
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const sensors = useSensors(pointerSensor)

  const form = useFormContext<UpdateIssueType>()
  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: 'subtasks',
    keyName: 'id'
  })
  const { getValues } = form
  const inputRef = useRef<HTMLInputElement>(null)

  useAutoUpdateField({
    form: form,
    field: 'subtasks',

    // isPause: (field, value) => {
    //   console.log(fields)
    //   return false
    // },
    callApi: (field, value) => {
      return issueService.updateIssue({
        id: getValues('id'),
        fieldChanging: field,
        subtasks:
          value?.map((item) => {
            return {
              name: item.name,
              checked: item.checked,
              order: item.order
            }
          }) ?? []
      })
    }
  })

  const handleAppend = () => {
    const value = inputRef.current?.value
    if (!value) {
      inputRef.current?.focus()
    } else {
      orderRef.current += 1

      append({
        name: value,
        checked: false,
        order: orderRef.current
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = fields.findIndex((f) => f.id === active.id)
    const newIndex = fields.findIndex((f) => f.id === over.id)
    if (oldIndex !== -1 && newIndex !== -1) {
      move(oldIndex, newIndex)
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <TitleLevel level={'lv-2'}>{message.label}</TitleLevel>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((item, index) => (
            <SubTaskItem
              key={item.id}
              index={index}
              {...item}
              remove={remove}
            />
          ))}
        </SortableContext>
      </DndContext>
      {open == false ? (
        <Button variant='outline' onClick={() => setOpen(true)}>
          <Icon icon={'ic:baseline-plus'} />
        </Button>
      ) : (
        <div className='mt-3 flex flex-col gap-2'>
          <SubTaskItemForm
            cancel={() => {
              setOpen(false)
            }}
            handleAppend={handleAppend}
            ref={inputRef}
          />
        </div>
      )}
    </div>
  )
}

type SubTaskItemProps = {
  id: string
  name: string
  index: number
  remove: (index: number) => void
}
const SubTaskItem = ({ id, name, index, remove }: SubTaskItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data: {
      id,
      name
    }
  })
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    opacity: isDragging ? 0.7 : undefined,
    border: isDragging ? '1px solid red' : undefined,
    backgroundColor: 'white'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className='flex items-center justify-between rounded-md border-2 p-2 shadow-sm ring-2'
    >
      <Button
        type='button'
        className={cn(
          'bg-transparent p-0 hover:cursor-grab hover:bg-gray-400',
          isDragging ? 'cursor-grab' : undefined
        )}
        {...listeners}
      >
        <Icon icon={'lsicon:drag-filled'} className='text-black' />
      </Button>
      <p className='flex-1 px-3'>{name}</p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon icon={'ri:more-fill'} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className='cancel' onClick={() => remove(index)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

type CreateSubTaskProps = {
  cancel: () => void
  handleAppend: () => void
}

const SubTaskItemForm = forwardRef<HTMLInputElement, CreateSubTaskProps>(
  ({ cancel, handleAppend, ...props }, ref) => {
    const message = messages.component.issue.subTasks
    return (
      <div className='flex flex-col gap-2'>
        <FormItem className='flex-1'>
          <FormControl>
            <Input placeholder={message.placeholder} {...props} ref={ref} />
          </FormControl>
        </FormItem>

        <div className='flex items-center gap-3'>
          <Button type='button' onClick={handleAppend} className='success'>
            {messages.component.issue.update.form.subTask.add}
          </Button>
          <Button type='button' onClick={() => cancel()} className='cancel'>
            {messages.component.issue.update.form.subTask.cancel}
          </Button>
        </div>
      </div>
    )
  }
)
export default UpdateSubTaskForm
