import { z } from 'zod'

const string = z.string().trim().min(1)
const dateRange = z.object({
  from: z.date(),
  to: z.date()
})
export { string, dateRange }
