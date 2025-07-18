import Editor from '@/components/Editor'
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
import messages from '@/constant/message.const'
import {
  BaseSprintFormSchema,
  BaseSprintFormType,
  CreateSprintFormType
} from '@/types/sprint.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, isBefore, isWithinInterval } from 'date-fns'
import { isNumber } from 'lodash'
import { useEffect, useState } from 'react'
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
  const message = messages.component.sprint.template.baseForm
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
      description: '',
      start: addDays(new Date(), 2),
      end: addDays(new Date(), 7)
    }
  })

  const { watch } = form

  const startDate = watch('start')
  const endDate = watch('end')
  const predictDate = watch('predict')

  useEffect(() => {
    if (durationValue.active !== 'custom') {
      const end = addDays(startDate, Number(durationValue.active) * 7)
      form.setValue('end', end)
    }
    // Reset end date if it is before start date
    if (isBefore(endDate, startDate)) {
      form.setValue('end', addDays(startDate, 7))
    }
    if (
      !isWithinInterval(predictDate, {
        start: startDate,
        end: endDate
      })
    ) {
      form.setValue('predict', startDate)
    }
  }, [durationValue, startDate])

  const handleSelectDurationChange = (value: string) => {
    if (value) {
      setDurationValue((prev) => ({
        ...prev,
        active: value as DurationType
      }))
    }
  }

  const handleSubmit = (values: CreateSprintFormType) => {
    console.log(JSON.stringify(values))
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
                  <FormLabel>{message.name}</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Analysis' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{message.description.label}</FormLabel>
                  <FormDescription>
                    {message.description.description}
                  </FormDescription>
                  <FormControl>
                    <Editor
                      className='h-full'
                      {...field}
                      classNameContainer='h-[200px] rounded-md border shadow-sm'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='mt-4 flex gap-3'>
              <FormItem>
                <FormLabel>{message.duration}</FormLabel>
                <Select
                  onValueChange={(value) => {
                    handleSelectDurationChange(value)
                  }}
                  defaultValue={
                    !isNumber(durationValue.active)
                      ? durationValue.active
                      : durationValue.active + ' ' + message.week
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
                          {isNumber(item)
                            ? `${item} ${message.week}`
                            : message.customDuration}
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
                  <FormItem className='flex-1'>
                    <FormLabel>{message.startDate}</FormLabel>
                    <DatePickerWithPresets
                      date={field.value}
                      setDate={(date) => {
                        if (date) {
                          field.onChange(date)
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
                  <FormItem className='flex-1'>
                    <FormLabel>{message.endDate}</FormLabel>
                    <DatePickerWithPresets
                      disabled={durationValue.active !== 'custom'}
                      min={form.getValues('start')}
                      date={field.value}
                      setDate={(date) => {
                        if (date) field.onChange(date)
                      }}
                    />
                    <div className='h-[20px]'>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className='mt-4 flex gap-3'>
              <FormField
                control={form.control}
                name='predict'
                render={({ field }) => (
                  <FormItem className='flex-1 shrink-0'>
                    <FormLabel>{message.predict}</FormLabel>
                    <DatePickerWithPresets
                      date={field.value}
                      min={form.getValues('start')}
                      max={form.getValues('end')}
                      setDate={(date) => {
                        if (date) {
                          field.onChange(date)
                        }
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='storyPoint'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{message.storyPoint.label}</FormLabel>
                    <FormDescription>
                      {message.storyPoint.description}
                    </FormDescription>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={message.storyPoint.placeholder}
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
