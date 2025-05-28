import Icon from '@/components/Icon'
import ListView from '@/components/ListView'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { FormControl, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAutoUpdateField } from '@/hooks/use-update'
import { UpdateIssueType } from '@/types/issue.type'
import { forwardRef, useRef, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
const UpdateSubTaskForm = () => {
  const [addMode, setAddMode] = useState<boolean>(false)
  const form = useFormContext<UpdateIssueType>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subTasks'
  })
  const inputRef = useRef<HTMLInputElement>(null)

  useAutoUpdateField({
    form: form,
    field: 'subTasks',

    onSuccess: (res) => {
      toast.success('subTasks updated')
    },
    onError: (err) => {
      toast.error('Failed to update name')
    }
  })

  const handleAppend = () => {
    if (!addMode) {
      setAddMode(true)
      return
    }
    const value = inputRef.current?.value
    if (!value) {
      inputRef.current?.focus()
    } else {
      append({
        name: value
      })
      setAddMode(false)
    }
  }

  return (
    <div className='border-accent mt-4 border-2 p-2'>
      <ListView
        className='flex-col gap-2'
        data={fields}
        emptyComponent={''}
        render={(field, index) => {
          return (
            <div
              key={field.id}
              className='flex items-center justify-between rounded-md border-2 px-4 py-2 shadow-sm'
            >
              {field.name}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Icon icon={'ri:more-fill'} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => remove(index)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        }}
      />
      <div className='mt-3 flex flex-col gap-2'>
        {!addMode ? (
          <Button type='button' onClick={handleAppend}>
            Add
          </Button>
        ) : (
          <SubTaskItemForm
            setAddMode={setAddMode}
            handleAppend={handleAppend}
            ref={inputRef}
          />
        )}
      </div>
    </div>
  )
}

type CreateSubTaskProps = {
  setAddMode: (mode: false) => void
  handleAppend: () => void
}

const SubTaskItemForm = forwardRef<HTMLInputElement, CreateSubTaskProps>(
  ({ setAddMode, handleAppend, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-2'>
        <FormItem className='flex-1'>
          <FormControl>
            <Input placeholder='Task' {...props} ref={ref} />
          </FormControl>
        </FormItem>

        <div className='flex items-center gap-3'>
          <Button type='button' onClick={handleAppend}>
            Add
          </Button>
          <Button
            type='button'
            onClick={() => setAddMode(false)}
            className='bg-red-500 text-white hover:cursor-pointer hover:opacity-60'
          >
            Delete
          </Button>
        </div>
      </div>
    )
  }
)
export default UpdateSubTaskForm
