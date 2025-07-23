import { z } from 'zod'

const ClockSimulatorSchema = z.object({
  to: z.coerce.date(),
  timeSpeech: z.coerce.number().int().positive()
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
