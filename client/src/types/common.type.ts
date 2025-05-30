import { z } from 'zod'

const string = z.string().trim().min(1)
const dateRange = z
  .object({
    from: z.date(),
    to: z.date()
  })
  .refine((data) => data.to <= data.from, {
    message: 'Date end need after date start',
    path: ['to']
  })
export { string, dateRange }
