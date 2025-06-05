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
    .flatMap(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return [] // skip empty values
      }
      if (Array.isArray(value)) {
        // generate multiple key=value pairs for array items
        return value.map(
          (v) => `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`
        )
      }
      // normal single value
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    })
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
// Function overload signatures
function loadSessionStorage<T>(key: string, fallback: T, isObj?: false): T // Case where not parsing JSON, returning raw value
function loadSessionStorage<T>(
  key: string,
  fallback: T,
  isObj: true
): T extends object ? T : never // Case where parsing JSON, returning object
function loadSessionStorage<T>(
  key: string,
  fallback: T,
  isObj: boolean = false
): T {
  // Default function implementation
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return fallback

    if (isObj) {
      try {
        return JSON.parse(raw) as T
      } catch (parseError) {
        console.warn(`Failed to parse JSON for key "${key}"`, parseError)
        return fallback
      }
    }

    return raw as T
  } catch (e) {
    console.warn(`Failed to load key "${key}" from sessionStorage`, e)
    return fallback
  }
}

async function urlToFile(url: string, filename: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  const contentType =
    response.headers.get('Content-Type') || 'application/octet-stream'
  return new File([blob], filename, { type: contentType })
}

export {
  cn,
  formatDate,
  invertColor,
  toQueryString,
  uuid,
  loadSessionStorage,
  urlToFile
}
