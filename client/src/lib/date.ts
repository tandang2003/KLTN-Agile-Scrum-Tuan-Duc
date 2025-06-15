import { format } from 'date-fns'

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

export { formatDateToString, formatDateRange, parseStringToDate }
