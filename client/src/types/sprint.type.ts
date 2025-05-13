import { stringSchema } from '@/types/other.type'
import { z } from 'zod'

const CreateSprintFormSchema = z
  .object({
    workspaceId: z.string(),
    title: stringSchema(),
    predict: z.date(),
    storyPoint: z.number().positive(),
    start: z.date(),
    end: z.date()
  })
  .refine((data) => data.start <= data.end, {
    message: 'Date end need after date start',
    path: ['end']
  })
  .refine((data) => data.start <= data.predict && data.predict <= data.end, {
    message: 'Date predict need between date start and date end',
    path: ['predict']
  })
type CreateSprintFormType = z.infer<typeof CreateSprintFormSchema>

export type { CreateSprintFormType }
export { CreateSprintFormSchema }
