import { HttpStatusCode } from 'axios'

type ResponseApi<T> = {
  code: number
  data: T & {
    createdAt?: Date | undefined
    updatedAt?: Date | undefined
    deletedAt?: Date | undefined
    createdBy?: string | undefined
    updatedBy?: string | undefined
    deletedBy?: string | undefined
  }
  message: string
}
type ResponseApiError = {
  code: number
  message: string
  error: FieldError[]
}

type FieldError = {
  field: string
  message: string
}

type Page<T> = {
  items: T[]
  currentPage: number
  totalPages: number
  totalItems: number
}

type PageRequest = {
  page: number
  size: number
}

class ValidationError extends Error {
  code: number
  message: string
  error: FieldError[]
  constructor({
    code = 403,
    message = 'Error Validation ',
    error = []
  }: Partial<ResponseApiError>) {
    super('Http Error')
    this.code = code
    this.message = message
    this.error = error

    // Restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

class UnauthorizedError extends Error {
  code: number
  message: string
  constructor() {
    super('Unauthorized')
    this.code = HttpStatusCode.Unauthorized
    this.message = 'Unauthorized'

    // Restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
export type { ResponseApi, ResponseApiError, FieldError, Page, PageRequest }

export { ValidationError, UnauthorizedError }
