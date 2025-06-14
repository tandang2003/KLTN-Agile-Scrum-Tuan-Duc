// utils/error-handler.ts
import axios from 'axios'

type NormalizedError = {
  status: number
  data: string
  statusText: string
}

/**
 * Normalizes any thrown error (Axios or unknown) into a standard format
 */
export function normalizeError(err: unknown): NormalizedError {
  if (axios.isAxiosError(err)) {
    return {
      statusText: err.message,
      status: err.response?.status || 500,
      data: 'Unknown error'
    }
  }

  return {
    statusText: err instanceof Error ? err.message : 'Unknown error',
    status: 500,
    data: 'Unknown error'
  }
}
