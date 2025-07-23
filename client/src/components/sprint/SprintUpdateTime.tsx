import DialogController from '@/components/dialog/DialogController'
import { Button } from '@/components/ui/button'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { useUpdateSprintForStudentMutation } from '@/feature/sprint/sprint.api'
import { disableSprintUpdateTime } from '@/feature/trigger/trigger.slice'
import { getMiddleDate, parseStringToDate } from '@/lib/date.helper'
import {
  UpdateSprintForStudentFormSchema,
  UpdateSprintForStudentFormType
} from '@/types/sprint.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const SprintUpdateTimeDialog = () => {
  const data = useAppSelector(
    (selector) => selector.triggerSlice.isSprintUpdateTime
  )
  const dispatch = useAppDispatch()
  const start = useMemo(
    () => (data ? parseStringToDate(data.start) : undefined),
    [data]
  )
  const end = useMemo(
    () => (data ? parseStringToDate(data.end) : undefined),
    [data]
  )
  const middle = useMemo(() => {
    if (!start || !end) return undefined
    return getMiddleDate(start, end)
  }, [start, end])

  const form = useForm<UpdateSprintForStudentFormType>({
    resolver: zodResolver(UpdateSprintForStudentFormSchema),
    defaultValues: {
      datePlanning: middle,
      datePreview: middle
    }
  })

  const [update] = useUpdateSprintForStudentMutation()

  useEffect(() => {
    if (middle) {
      form.reset({
        datePlanning: middle,
        datePreview: middle
      })
    }
  }, [middle, form])

  const handleSubmit = (value: UpdateSprintForStudentFormType) => {
    if (!data) return
    update({
      projectId: data.projectId,
      sprintId: data.sprintId,
      dtPlanning: value.datePlanning,
      dtPreview: value.datePreview
    })
      .unwrap()
      .then(() => {
        dispatch(disableSprintUpdateTime())
        toast.success('Cập nhật thành công')
      })
      .catch((error) => {
        form.setError('root', {
          type: 'manual',
          message: error.data.message || 'Cập nhật thất bại'
        })
      })
  }

  if (!data || !start || !end || !middle) return null

  return (
    <DialogController
      open={data != null}
      onOpen={() => {
        dispatch(disableSprintUpdateTime())
      }}
    >
      <DialogContent>
        <DialogTitle>Cập nhật thời gian Sprint</DialogTitle>
        <DialogDescription />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='datePlanning'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Thời gian planning</FormLabel>
                  <FormControl>
                    <DatePickerWithPresets
                      min={start}
                      date={field.value ?? middle}
                      onDayBlur={field.onChange}
                      max={end}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='datePreview'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Thời gian Preview</FormLabel>
                  <FormControl>
                    <DatePickerWithPresets
                      min={start}
                      date={field.value ?? middle}
                      onDayBlur={field.onChange}
                      max={end}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex'>
              <Button className='ml-auto'>Cập nhập</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </DialogController>
  )
}

export default SprintUpdateTimeDialog
