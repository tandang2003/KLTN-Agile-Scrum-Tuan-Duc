import { z } from 'zod'

const ClockSimulatorSchema = z
  .object({
    to: z.coerce.date(),
    timeSpeech: z.coerce.number().int().positive()
  })
  .refine((data) => new Date() < data.to, {
    message: 'Date to must be in the future',
    path: ['to']
  })

type ClockSimulatorReqType = z.infer<typeof ClockSimulatorSchema>
type ClockSimulatorResponseType = {
  now: Date
  timeSpeech: number
}
type ClockSimulatorConfigType = {
  initTime: Date
  timeSpeech: number
  timeEnd?: Date
}
export { ClockSimulatorSchema }
export type {
  ClockSimulatorReqType,
  ClockSimulatorResponseType,
  ClockSimulatorConfigType
}
