import { SprintModel } from '@/types/model/sprint.model'
import { Id, stringSchema } from '@/types/other.type'
import { z } from 'zod'

const BaseSprintFormSchema = z.object({
  title: stringSchema(),
  storyPoint: z.coerce.number().positive(),
  start: z.date(),
  predict: z.date(),
  end: z.date()
})

const CreateSprintFormSchema = BaseSprintFormSchema.refine(
  (data) => data.start <= data.end,
  {
    message: 'Date end need after date start',
    path: ['end']
  }
).refine((data) => data.start < data.predict && data.predict < data.end, {
  message: 'Date predict need between date start and date end',
  path: ['predict']
})

const UpdateSprintFormSchema = BaseSprintFormSchema.extend({
  id: z.string(),
  position: z.number().optional()
})
  .refine((data) => data.start <= data.end, {
    message: 'Date end need after date start',
    path: ['end']
  })
  .refine((data) => data.start < data.predict && data.predict < data.end, {
    message: 'Date predict need between date start and date end',
    path: ['predict']
  })
type BaseSprintFormType = z.infer<typeof BaseSprintFormSchema>
type CreateSprintFormType = z.infer<typeof CreateSprintFormSchema>
type UpdateSprintFormType = z.infer<typeof UpdateSprintFormSchema>
type UpdateSprintRequest = UpdateSprintFormType
type CreateSprintRequest = CreateSprintFormType & {
  workspaceId: Id
  position?: number
}
type SprintResponse = SprintModel

type SprintWorkspaceDataTable = SprintModel

type SprintOverview = Pick<SprintModel, 'id' | 'start' | 'end'>

export { BaseSprintFormSchema, CreateSprintFormSchema, UpdateSprintFormSchema }
export type {
  BaseSprintFormType,
  CreateSprintFormType,
  CreateSprintRequest,
  SprintResponse,
  SprintWorkspaceDataTable,
  UpdateSprintFormType,
  UpdateSprintRequest,
  SprintOverview
}
