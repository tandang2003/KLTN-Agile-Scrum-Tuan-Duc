import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar, CalendarProps } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

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
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
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
      return date > new Date(max) || date < new Date(min)
    }
    if (max) {
      return date > new Date(max)
    }
    if (min) {
      return date < new Date(min)
    }
    return false
  }

  return (
    <Popover>
      <PopoverTrigger disabled={disabled} className={cn(className)} asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
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
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='0'>Today</SelectItem>
            <SelectItem value='1'>Tomorrow</SelectItem>
            <SelectItem value='3'>In 3 days</SelectItem>
            <SelectItem value='7'>In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            disabled={(date) => isDisable(date)}
            onDayBlur={onDayBlur}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
