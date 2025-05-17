import { z } from 'zod'

export type Id = string
export const stringSchema = () =>
  z.string().trim().min(1, { message: 'Not Blank' })
