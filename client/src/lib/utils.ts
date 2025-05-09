import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const uuid = (): string => {
  return uuidv4()
}

const invertColor = (hex: string) => {
  const r = 255 - parseInt(hex.substr(1, 2), 16)
  const g = 255 - parseInt(hex.substr(3, 2), 16)
  const b = 255 - parseInt(hex.substr(5, 2), 16)

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}
type AnyObject = { [key: string]: any }

const toQueryString = (obj: AnyObject) => {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join('&')
}

const formatDate = (
  date: Date,
  pattern: 'SHORT' | 'LONG' | string = 'SHORT'
) => {
  const patterns: Record<'SHORT' | 'LONG', string> = {
    SHORT: 'dd/MM/yyyy',
    LONG: 'HH:mm dd/MM/yyyy'
  }

  const resolvedPattern =
    pattern === 'SHORT' || pattern === 'LONG' ? patterns[pattern] : pattern

  return format(date, resolvedPattern)
}
export { cn, formatDate, invertColor, toQueryString, uuid }
