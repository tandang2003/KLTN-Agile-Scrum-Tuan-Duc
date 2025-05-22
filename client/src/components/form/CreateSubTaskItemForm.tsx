import Icon from '@/components/Icon'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateIssueRequest } from '@/types/issue.type'
import { useFormContext } from 'react-hook-form'

type CreateSubTaskProps = {
  index: number
  onRemove?: () => void
}

const CreateSubTaskItemForm = ({ index, onRemove }: CreateSubTaskProps) => {
  const { control } = useFormContext<CreateIssueRequest>()
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

export default CreateSubTaskItemForm
