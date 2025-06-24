import Icon from '@/components/Icon'
import { Button } from '@/components/ui/button'
import { DatePickerWithPresets } from '@/components/ui/date-picker'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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
import { useSimulatedClock } from '@/hooks/use-simulated-clock'
import simulatorService from '@/services/simulator.service'
import {
  ClockSimulatorSchema,
  ClockSimulatorType
} from '@/types/simulator.type'

import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
type ClockSimulatorProps = {
  children: ReactNode
}

const ClockSimulator = () => {
  const [initTime, setInitTime] = useState<Date | null>(null)
  const [timeSpeech, setTimeSpeech] = useState<number>(1)
  const [open, setOpen] = useState(false)
  const form = useForm<ClockSimulatorType>({
    resolver: zodResolver(ClockSimulatorSchema),
    defaultValues: {
      timeSpeech: 1,
      to: new Date()
    }
  })
  useEffect(() => {
    simulatorService.getSimulator().then((data) => {
      setInitTime(new Date(data.now))
      setTimeSpeech(data.timeSpeech)
      form.reset({
        timeSpeech: data.timeSpeech,
        to: data.now
      })
    })
  }, [])

  const simulatedTime = useSimulatedClock({
    initialSimulatedTime: initTime ?? new Date(),
    timeSpeech: timeSpeech
  })

  const handleSubmit = (values: ClockSimulatorType) => {
    simulatorService.setSimulator(values).then((date) => {
      setInitTime(new Date(date))
      setTimeSpeech(values.timeSpeech)

      toast.success('Simulator time set successfully', {
        description: `Simulator time set to ${date.toLocaleString()}`
      })
      form.reset({
        timeSpeech: values.timeSpeech,
        to: date
      })
      setOpen(false)
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='fixed bottom-5 left-5 z-50' asChild>
        <div className='border-accent flex items-center gap-3 rounded-md border-2 bg-white px-4 py-2 shadow-md hover:cursor-pointer'>
          <Icon icon={'mdi:clock'} size={30} />
          <p>{simulatedTime.toISOString()}</p>
        </div>
      </DialogTrigger>
      <DialogContent className='top-1/4' aria-describedby={undefined}>
        <DialogTitle />
        <DialogHeader>
          <h3 className='h3'>Simulator time</h3>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className='flex gap-5 [&>*]:flex-1'>
              <FormField
                control={form.control}
                name='to'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date to</FormLabel>
                    <FormControl>
                      <DatePickerWithPresets
                        date={field.value}
                        setDate={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='timeSpeech'
              render={({ field }) => (
                <FormItem className='mt-3'>
                  <FormLabel>Time Speech</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Set the time in epoch seconds, for example, 1700000000
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className='mt-4' type='submit'>
                Ok
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ClockSimulator
