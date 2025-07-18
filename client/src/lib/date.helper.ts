import { addDays, differenceInDays, format, startOfDay } from 'date-fns'

const formatDateToString = (
  date: Date,
  pattern: 'SHORT' | 'LONG' | string = 'SHORT'
): string => {
  const patterns: Record<'SHORT' | 'LONG', string> = {
    SHORT: 'dd/MM/yyyy',
    LONG: 'HH:mm dd/MM/yyyy'
  }

  const resolvedPattern =
    pattern === 'SHORT' || pattern === 'LONG' ? patterns[pattern] : pattern

  return format(date, resolvedPattern)
}

const formatDateRange = (start: Date, end: Date) =>
  `${format(start, 'd/M')} - ${format(end, 'd/M/yyyy')}`

const parseStringToDate = (dateString: string): Date => {
  return new Date(dateString)
}

const toISODateString = (date: Date): string => {
  return new Date(date).toISOString()
}

function getDateByPercent(start: Date, end: Date, percent: number): Date {
  const totalDays = differenceInDays(end, start)
  const targetDay = Math.round((percent / 100) * totalDays)
  return startOfDay(addDays(start, targetDay))
}

export {
  formatDateToString,
  formatDateRange,
  parseStringToDate,
  toISODateString,
  getDateByPercent
}
