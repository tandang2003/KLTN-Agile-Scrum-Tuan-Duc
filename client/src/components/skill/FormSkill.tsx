import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAppSelector } from '@/context/redux/hook'
import {
  useCreateSkillMutation,
  useGetAllSkillsQuery,
  useUpdateSkillMutation
} from '@/feature/skill/skill.api'
import { SkillLevel, skillLevelList } from '@/types/model/typeOf'
import { SkillRequestType, SkillSchema } from '@/types/skill.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCommandState } from 'cmdk'
import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const FormSkill = () => {
  const [open, setOpen] = useState(false)
  const { data: skills } = useGetAllSkillsQuery()
  const [create] = useCreateSkillMutation()
  const { mode, data: values } = useAppSelector((state) => state.skillSlice)
  const [update] = useUpdateSkillMutation()
  const form = useForm<SkillRequestType>({
    resolver: zodResolver(SkillSchema),
    defaultValues: values ?? {
      proficiency: 1,
      skillName: ''
    }
  })

  const { control, setValue, handleSubmit, reset } = form

  const handleAddSkill = (data: SkillRequestType) => {
    if (mode === 'create')
      create(data)
        .unwrap()
        .then(() => {
          reset()
          toast.success('Skill created successfully!')
        })
        .catch((error) => {
          toast.error('Failed to create skill: ' + error.message)
        })

    if (mode === 'update')
      update(data)
        .unwrap()
        .then(() => {
          toast.success('Skill updated successfully!')
        })
        .catch((error) => {
          toast.error('Failed to update skill: ' + error.message)
        })
  }

  const handleSetValue = (value: string) => {
    setValue('skillName', value)
    setOpen(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleAddSkill)} className='w-full'>
        <div className='flex gap-4'>
          <FormField
            control={control}
            name='skillName'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Skill</FormLabel>
                  <div className='flex'>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={mode === 'update'}
                          variant='outline'
                          role='combobox'
                          aria-expanded={open}
                          className='w-[200px] justify-between'
                        >
                          {field.value === ''
                            ? 'Select framework...'
                            : field.value}
                          <ChevronsUpDown className='opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align='start'>
                        <Command>
                          <CommandInput placeholder='Search items...' />
                          <CommandEmptySkill setValue={handleSetValue} />
                          <CommandList>
                            {skills?.map((item) => {
                              return (
                                <CommandItem
                                  key={item}
                                  value={item}
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  {item}
                                </CommandItem>
                              )
                            })}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className='h-[20px]'>
                    <FormMessage />
                  </div>
                </FormItem>
              )
            }}
          />
          <FormField
            control={control}
            name='proficiency'
            render={({ field }) => {
              return (
                <FormItem className='w-full'>
                  <FormLabel>Proficiency</FormLabel>
                  <Select
                    defaultValue={field.value.toString()}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skillLevelList.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={SkillLevel[item].toString()}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className='h-[20px]'>
                    <FormMessage />
                  </div>
                </FormItem>
              )
            }}
          />
        </div>
        <div className='mt-4 flex justify-end'>
          <Button type='submit'>{mode === 'create' ? 'Add' : 'Update'}</Button>
        </div>
      </form>
    </Form>
  )
}

type CommandEmptySkillProps = {
  setValue?: (value: string) => void
}

const CommandEmptySkill = ({ setValue }: CommandEmptySkillProps) => {
  const search = useCommandState((state) => state.search)

  return (
    <CommandEmpty
      className='hover:bg-accent flex px-1.5 py-2 pl-8 hover:cursor-pointer'
      onClick={() => {
        setValue?.(search)
      }}
    >
      <div>{search}</div>
    </CommandEmpty>
  )
}

export default FormSkill
