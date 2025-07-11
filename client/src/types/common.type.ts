import { z } from 'zod'

const string = z.string().trim().min(1)
const dateRange = z
  .object({
    from: z.date(),
    to: z.date()
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

const dateStringToDateSchema = z.coerce.date()
const stringToDate = (date: string) => {
  return dateStringToDateSchema.safeParse(date)
}

export { dateRange, string, stringToDate }
