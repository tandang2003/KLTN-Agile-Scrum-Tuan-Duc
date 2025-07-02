import Icon from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { BaseIssueFormType } from '@/types/issue.type'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRef } from 'react'
import messages from '@/constant/message.const'

const CreateSubTaskForm = () => {
  const message = messages.component.issue
  const { control } = useFormContext<BaseIssueFormType>()
  const orderRef = useRef<number>(0)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks'
  })

  const handleAppend = () => {
    append({
      name: '',
      checked: false,
      order: orderRef.current
    })
    orderRef.current = orderRef.current += 1
  }
  return (
    <div className='border-accent mt-4 border-2 p-2 shadow-lg'>
      <div className='flex justify-between'>
        <h2>{message.subTasks.label}</h2>
        <Button type='button' onClick={handleAppend}>
          <Icon icon={'ic:baseline-plus'} />
        </Button>
      </div>
      <div className='mt-3 flex flex-col gap-2'>
        {fields.map((field, index) => {
          return (
            <CreateSubTaskItemForm
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          )
        })}
      </div>
    </div>
  )
}

type CreateSubTaskProps = {
  index: number
  onRemove?: () => void
}

const CreateSubTaskItemForm = ({ index, onRemove }: CreateSubTaskProps) => {
  const message = messages.component.issue

  const { control } = useFormContext<BaseIssueFormType>()
  return (
    <div className='flex items-center gap-2'>
      <FormField
        control={control}
        name={`subtasks.${index}.name`}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormControl>
              <Input placeholder={message.subTasks.placeholder} {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Icon
        icon={'lineicons:xmark'}
        onClick={onRemove}
        className='cancel grid size-[30px] place-items-center rounded-md'
      />
    </div>
  )
}

export default CreateSubTaskForm
