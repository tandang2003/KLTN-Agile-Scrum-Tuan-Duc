import { z } from 'zod'

export type Id = string | number
export const stringSchema = () =>
  z.string().trim().min(1, { message: 'Not Blank' })
