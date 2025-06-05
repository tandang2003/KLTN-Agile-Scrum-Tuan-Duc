import { Button } from '@/components/ui/button'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  BaseSprintFormSchema,
  BaseSprintFormType,
  CreateSprintFormType
} from '@/types/sprint.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays } from 'date-fns'
import { isNumber } from 'lodash'
import { useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

type DurationType = 1 | 2 | 3 | 4 | 'custom'

type SprintTemplateFormProps = {
  initialValues?: BaseSprintFormType
  onSubmit?: (
    values: BaseSprintFormType,
    form: UseFormReturn<BaseSprintFormType>
  ) => void
  submitText?: string
}

const SprintTemplateBaseForm = ({
  onSubmit,
  initialValues,
  submitText = 'Create Sprint'
}: SprintTemplateFormProps) => {
  const [durationValue, setDurationValue] = useState<{
    active: DurationType
    list: DurationType[]
  }>({
    active: 'custom',
    list: [1, 2, 3, 4, 'custom']
  })

  const form = useForm<BaseSprintFormType>({
    resolver: zodResolver(BaseSprintFormSchema),
    defaultValues: initialValues ?? {
      title: '',
      predict: addDays(new Date(), 4),
      storyPoint: 0,
      start: new Date(),
      end: addDays(new Date(), 7)
    }
  })

  const handleSelectDurationChange = (value: string) => {
    if (value) {
      if (value !== 'custom') {
        const end = addDays(form.getValues('start'), Number(value) * 7)
        form.setValue('end', end)
      }
      setDurationValue((prev) => ({
        ...prev,
        active: value as DurationType
      }))
    }
  }

  const handleSubmit = (values: CreateSprintFormType) => {
    onSubmit?.(values, form)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='[&>*:not(:first-child)]:mt-3'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sprint name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Analysis' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='storyPoint'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Story Point</FormLabel>
                  <FormDescription>
                    This is a story point that sprint is archived before end of
                    sprint
                  </FormDescription>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='1'
                      {...field}
                      onChange={(event) =>
                        form.setValue('storyPoint', event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='mt-4 flex gap-3'>
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <Select
                  onValueChange={(value) => {
                    handleSelectDurationChange(value)
                  }}
                  defaultValue={
                    !isNumber(durationValue.active)
                      ? durationValue.active
                      : durationValue.active + ' week'
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {durationValue.list.map((item, index) => {
                      return (
                        <SelectItem
                          key={index}
                          value={item?.toString() ?? 'custom'}
                        >
                          {isNumber(item) ? `${item} week` : 'custom'}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <div className='h-[20px]'>
                  <FormMessage />
                </div>
              </FormItem>

              <FormField
                control={form.control}
                name='start'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Time start</FormLabel>
                    <DatePickerWithPresets
                      date={field.value}
                      setDate={(date) => {
                        if (date) {
                          field.onChange(new Date(date))
                        }
                      }}
                    />
                    <div className='h-[20px]'>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='end'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Time end</FormLabel>
                    <DatePickerWithPresets
                      disabled={durationValue.active !== 'custom'}
                      date={field.value}
                      setDate={(date) => {
                        if (date) {
                          field.onChange(new Date(date))
                        }
                      }}
                    />
                    <div className='h-[20px]'>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='predict'
              render={({ field }) => (
                <FormItem className='flex-1 shrink-0'>
                  <FormLabel>Time predict</FormLabel>
                  <DatePickerWithPresets
                    date={field.value}
                    min={form.getValues('start')}
                    max={form.getValues('end')}
                    setDate={(date) => {
                      if (date) {
                        field.onChange(new Date(date))
                      }
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className='mt-4 w-full'
            type='submit'
            loading={form.formState.isSubmitting}
          >
            {submitText}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SprintTemplateBaseForm
