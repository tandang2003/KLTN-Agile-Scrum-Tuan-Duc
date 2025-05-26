import Icon from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { BaseIssueFormType } from '@/types/issue.type'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ListView from '@/components/ListView'

const UpdateSubTaskForm = () => {
  const { control } = useFormContext<BaseIssueFormType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subTasks'
  })

  const handleAppend = () => {
    append({
      name: ''
    })
  }
  return (
    <div className='border-accent mt-4 border-2 p-2'>
      <div className='flex justify-between'></div>
      <div className='mt-3 flex flex-col gap-2'>
        <ListView
          className='flex-col gap-2'
          data={fields}
          emptyComponent={''}
          render={(field, index) => {
            return (
              <SubTaskItemForm
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            )
          }}
          append={
            <Button className='w-full' type='button' onClick={handleAppend}>
              <Icon icon={'ic:baseline-plus'} />
            </Button>
          }
        />
      </div>
    </div>
  )
}

type CreateSubTaskProps = {
  index: number
  onRemove?: () => void
}

const SubTaskItemForm = ({ index, onRemove }: CreateSubTaskProps) => {
  const { control } = useFormContext<BaseIssueFormType>()
  return (
    <div className='flex items-center gap-2'>
      <FormField
        control={control}
        name={`subTasks.${index}.name`}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormControl>
              <Input placeholder='Task' {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Icon
        icon={'lineicons:xmark'}
        onClick={onRemove}
        className='grid size-[30px] place-items-center rounded-md bg-red-500 text-white hover:cursor-pointer hover:opacity-60'
      />
    </div>
  )
}

export default UpdateSubTaskForm
