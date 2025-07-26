import TitleLevel from '@/components/issue/TitleLevel'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Control, FieldValues, Path } from 'react-hook-form'

type SelectEnumProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
  TOption extends readonly string[]
> = {
  control: Control<TFieldValues>
  name: TName
  label?: string
  data: TOption
  renderItem?: (item: TOption[number]) => React.ReactNode
}

const SelectEnum = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
  TOption extends readonly string[]
>({
  control,
  name,
  label,
  data,
  renderItem
}: SelectEnumProps<TFieldValues, TName, TOption>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <TitleLevel level={'lv-4'}>{label || name}</TitleLevel>
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a value' />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((item) => (
                <SelectItem key={item} value={item}>
                  {renderItem ? renderItem(item) : item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectEnum
