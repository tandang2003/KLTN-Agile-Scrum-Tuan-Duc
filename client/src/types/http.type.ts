import { HttpStatusCode } from 'axios'

export type ResponseApi<T> = {
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
export type ResponseApiError = {
  code: number
  message: string
  error: FieldError[]
}

export type FieldError = {
  field: string
  message: string
}

export class ValidationError extends Error {
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

export class UnauthorizedError extends Error {
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
