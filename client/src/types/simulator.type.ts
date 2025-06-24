import { z } from 'zod'

const ClockSimulatorSchema = z
  .object({
    to: z.coerce.date(),
    timeSpeech: z.coerce.number().int().positive()
  })
  .refine((data) => new Date() < data.to, {
    message: 'Date to must be in the future'
  })

type ClockSimulatorType = z.infer<typeof ClockSimulatorSchema>
type ClockSimulatorResponseType = {
  now: Date
  timeSpeech: number
}
export { ClockSimulatorSchema }
export type { ClockSimulatorType, ClockSimulatorResponseType }
