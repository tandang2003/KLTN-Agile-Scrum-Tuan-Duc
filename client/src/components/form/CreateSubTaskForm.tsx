import CreateSubTaskItemForm from '@/components/form/CreateSubTaskItemForm'
import Icon from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { CreateIssueRequest } from '@/types/issue.type'
import { useFieldArray, useFormContext } from 'react-hook-form'

const CreateSubTaskForm = () => {
  const { control } = useFormContext<CreateIssueRequest>()
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
    <div className='border-accent mt-4 border-2 p-2 shadow-lg'>
      <div className='flex justify-between'>
        <h2>Sub tasks</h2>
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

export default CreateSubTaskForm
