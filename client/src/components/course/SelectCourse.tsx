import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useGetAllCourseQuery } from '@/feature/course/course.api'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
type SelectCourseProps = {
  value: string
  setValue: (value: string) => void
}

const SelectCourse = ({ value, setValue }: SelectCourseProps) => {
  const { data: courses } = useGetAllCourseQuery()

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className={cn(
            'w-full justify-between',
            !value && 'text-muted-foreground'
          )}
        >
          {value
            ? courses?.find((item) => item.id === value)?.name
            : 'Chọn môn học'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0' align='start'>
        <Command>
          <CommandInput placeholder='Chọn môn học...' className='h-9' />
          <CommandList>
            <CommandEmpty>Không tìm thấy môn học</CommandEmpty>
            <CommandGroup>
              {courses?.map((course) => (
                <CommandItem
                  value={course.name}
                  key={course.id}
                  onSelect={() => {
                    setValue(course.id)
                  }}
                >
                  {course.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      course.id === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectCourse
