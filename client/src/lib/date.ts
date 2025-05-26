import { format, parseISO } from 'date-fns'

const LOCAL_DATE_TIME = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"

const formatDateToString = (date: Date): string => {
  return format(date, LOCAL_DATE_TIME)
}

const formatDateRange = (start: Date, end: Date) =>
  `${format(start, 'd/M')} - ${format(end, 'd/M/yyyy')}`

export { formatDateToString, formatDateRange }
