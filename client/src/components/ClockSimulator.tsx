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
import {
  useSimulatedClock,
  UseSimulatedClockOptions
} from '@/hooks/use-simulated-clock'
import simulatorService from '@/services/simulator.service'
import {
  ClockSimulatorReqType,
  ClockSimulatorSchema
} from '@/types/simulator.type'
import { formatInTimeZone } from 'date-fns-tz'

import { zodResolver } from '@hookform/resolvers/zod'
import { isBefore } from 'date-fns'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import { useStompClient } from '@/hooks/use-stomp-client'
import { uuid } from '@/lib/utils'
import socketService from '@/services/socket.service'

const ClockSimulator = () => {
  const [open, setOpen] = useState(false)
  const senderIdRef = useRef<string>(uuid()) // One-time UUID

  const [isReset, setIsReset] = useState(false)
  const [config, setConfig] = useState<UseSimulatedClockOptions | null>(null)
  const form = useForm<ClockSimulatorReqType>({
    resolver: zodResolver(ClockSimulatorSchema)
  })
  const unsubscribeRef = useRef<(() => void) | null>(null)

  const auth = useAuth()
  useStompClient({
    accessToken: auth.accessToken,
    onConnect: (_) => {
      console.log('✅ WebSocket time connected')

      // Move subscription logic here:
      const subscription = socketService.receiveMessageTime(client, (value) => {
        const { time, timeSpeech, to, senderId } = value.bodyParse.message
        if (senderId !== senderIdRef.current) {
          setConfig({
            initTime: new Date(time),
            timeSpeech: timeSpeech,
            timeEnd: new Date(to)
          })
          simulatorService.setSimulatorLocal(value.bodyParse.message)

          if (timeSpeech === 1) {
            toast.info(`${senderId} đâ reset time`)
            setIsReset(false)
          } else {
            toast.info(`${senderId} đang hiệu chỉnh time`)
            setIsReset(true)
          }
        }
      })

      // Clean up on disconnect
      unsubscribeRef.current = () => {
        subscription.unsubscribe()
      }
    },
    onDisconnect: () => {
      unsubscribeRef.current?.()
      console.log('🔌 Disconnected WebSocket time')
    },
    onError: (error) => {
      console.error('WebSocket time error', error)
    }
  })

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.()
    }
  }, [])

  const hookConfig = useMemo(() => {
    if (!config) {
      return {
        initTime: new Date(),
        timeEnd: new Date(),
        timeSpeech: 1
      }
    }

    return config
  }, [config])

  const simulatedTime = useSimulatedClock(hookConfig)

  const ClockDisplay = useMemo(
    () => (
      <div className='border-accent flex items-center gap-3 rounded-md border-2 bg-white px-4 py-2 shadow-md hover:cursor-pointer'>
        <Icon icon={'mdi:clock'} size={30} />
        <div className='flex gap-2'>
          <Badge>UTC</Badge>
          <p>{formatInTimeZone(simulatedTime, 'UTC', 'HH:mm:ss dd/MM/yyyy')}</p>
        </div>
        <div className='flex gap-2'>
          <Badge>GMT +7</Badge>
          <p>
            {formatInTimeZone(
              simulatedTime,
              'Asia/Ho_Chi_Minh',
              'HH:mm:ss dd/MM/yyyy'
            )}
          </p>
        </div>
      </div>
    ),
    [simulatedTime]
  )

  // Fetch initial simulator configuration
  useEffect(() => {
    simulatorService.getSimulator().then((config) => {
      setConfig({
        initTime: config.initTime,
        timeSpeech: config.timeSpeech,
        timeEnd: config.timeEnd,
        onReachedEnd: config.timeEnd ? handleResetSimulator : undefined
      })
      if (config.timeEnd) {
        setIsReset(true)
      }
      form.reset({
        timeSpeech: config.timeSpeech,
        to: config.timeEnd
      })
    })
  }, [])

  const handleSubmit = (values: ClockSimulatorReqType) => {
    if (config)
      if (isBefore(values.to, config.initTime)) {
        form.setError('to', {
          type: 'manual',
          message: 'The end date must be after the initial time'
        })
        return
      }
    simulatorService
      .setSimulator(values, senderIdRef.current)
      .then((config) => {
        toast.success('Simulator time set successfully', {
          description: `Simulator time set to ${values.to.toLocaleString()}`
        })
        setConfig({
          initTime: config.initTime,
          timeSpeech: config.timeSpeech,
          timeEnd: config.timeEnd,
          onReachedEnd: handleResetSimulator
        })
        setIsReset(true)
        setOpen(false)
      })
  }

  const handleResetSimulator = useCallback(() => {
    simulatorService
      .resetSimulator(senderIdRef.current)
      .then((config) => {
        toast.success('Simulator time reset successfully')
        form.reset({
          timeSpeech: config.timeSpeech,
          to: config.timeEnd
        })
        setConfig({
          initTime: config.initTime,
          timeSpeech: config.timeSpeech
        })
      })
      .finally(() => {
        setIsReset(false)
        setOpen(false)
      })
  }, [form, simulatedTime])

  // useEffect(() => {
  //   console.log(simulatedTime)
  // }, [simulatedTime])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{ClockDisplay}</DialogTrigger>
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
                        disabled={isReset}
                        date={field.value ?? config?.initTime}
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
                    <Input {...field} disabled={isReset} />
                  </FormControl>
                  <FormDescription>
                    Set the time in epoch seconds, for example, 1700000000
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              {isReset ? (
                <Button
                  className='mt-4'
                  type='button'
                  onClick={handleResetSimulator}
                >
                  Reset
                </Button>
              ) : (
                <Button className='mt-4' type='submit'>
                  Ok
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ClockSimulator
