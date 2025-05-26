import { SprintModel } from '@/types/model/sprint.model'
import { Id, stringSchema } from '@/types/other.type'
import { z } from 'zod'

const CreateSprintFormSchema = z
  .object({
    title: stringSchema(),
    predict: z.date(),
    minimumStoryPoint: z.number().positive(),
    start: z.date(),
    end: z.date()
  })
  .refine((data) => data.start <= data.end, {
    message: 'Date end need after date start',
    path: ['end']
  })
  .refine((data) => data.start < data.predict && data.predict < data.end, {
    message: 'Date predict need between date start and date end',
    path: ['predict']
  })
type CreateSprintFormType = z.infer<typeof CreateSprintFormSchema>
type CreateSprintRequest = CreateSprintFormType & {
  workspaceId: Id
}
type SprintResponse = SprintModel

type SprintWorkspaceDataTable = SprintModel

export type {
  CreateSprintFormType,
  CreateSprintRequest,
  SprintResponse,
  SprintWorkspaceDataTable
}
export { CreateSprintFormSchema }
