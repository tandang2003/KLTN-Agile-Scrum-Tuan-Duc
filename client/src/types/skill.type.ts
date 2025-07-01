import { stringSchema } from '@/types/other.type'
import { z } from 'zod'

type SkillRequest = {
  skillName: string
  proficiency: number
}

const SkillSchema = z.object({
  skillName: stringSchema,
  proficiency: z.number().min(1).max(5)
})

type SkillRequestType = z.infer<typeof SkillSchema>

type SkillResponse = {
  skillName: string
  proficiency: number
}

export { SkillSchema }
export type { SkillRequest, SkillRequestType, SkillResponse }
