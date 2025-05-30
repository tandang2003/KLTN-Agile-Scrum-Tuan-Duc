import { date, z } from 'zod'

const string = z.string().trim().min(1)
const dateRange = z
  .object({
    from: z.date().optional(),
    to: z.date().optional()
  })
  .refine(
    (data) => {
      if (data.from && data.to) {
        return data.from <= data.to
      }
      return true
    },
    {
      message: 'Date end need after date start',
      path: ['to']
    }
  )
export { string, dateRange }
