import { string } from '@/types/common.type'
import { z } from 'zod'

type SkillRequest = {
  skillName: string
  proficiency: number
}

const SkillSchema = z.object({
  skillName: string,
  proficiency: z.number().min(1).max(5)
})

type SkillRequestType = z.infer<typeof SkillSchema>

type SkillResponse = {
  skillName: string
  proficiency: number
}

export { SkillSchema }
export type { SkillRequest, SkillRequestType, SkillResponse }
