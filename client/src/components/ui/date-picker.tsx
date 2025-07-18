import { addDays, format, isAfter, isBefore, isWithinInterval } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'
import { vi } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import { Calendar, CalendarProps } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn, formatDate } from '@/lib/utils'

type DatePickerWithRangeProps = {
  date?: DateRange
  setDate?: (date: DateRange | undefined) => void
  onOpen?: (open: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>

export function DatePickerWithRange({
  date,
  setDate,
  onOpen,
  className
}: DatePickerWithRangeProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover onOpenChange={onOpen}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} - {formatDate(date.to)}
                </>
              ) : (
                formatDate(date.from)
              )
            ) : (
              <span>{messages.component.ui.datePicker.placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import messages from '@/constant/message.const'

type DatePickerWithPresetsProps = {
  date?: Date
  setDate?: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
  min?: Date
  max?: Date
} & Pick<CalendarProps, 'onDayBlur'>

export function DatePickerWithPresets({
  date,
  setDate,
  className,
  disabled = false,
  max,
  min,
  onDayBlur
}: DatePickerWithPresetsProps) {
  const isDisable = (date: Date) => {
    if (min && max) {
      return !isWithinInterval(date, {
        start: min,
        end: max
      })
    }
    if (max) {
      return isAfter(date, max)
    }
    if (min) {
      return isBefore(date, min)
    }
    return false
  }

  return (
    <Popover>
      <PopoverTrigger disabled={disabled} className={cn(className)} asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {date ? (
            formatDate(date, 'SHORT')
          ) : (
            <span>{messages.component.ui.datePicker.placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='flex w-auto flex-col space-y-2 p-2'
      >
        <Select
          onValueChange={(value) =>
            setDate && setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Chọn' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='0'>Hôm nay</SelectItem>
            <SelectItem value='1'>Hôm qua</SelectItem>
            <SelectItem value='3'>3 ngày trước</SelectItem>
            <SelectItem value='7'>1 tuần</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(date) => {
              if (date && setDate) {
                setDate(date)
              }
            }}
            disabled={(date) => isDisable(date)}
            onDayBlur={onDayBlur}
            defaultMonth={date ?? new Date()}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
