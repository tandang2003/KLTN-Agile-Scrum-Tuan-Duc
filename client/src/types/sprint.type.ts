import messages from '@/constant/message.const'
import { SprintModel } from '@/types/model/sprint.model'
import { Id, stringSchema } from '@/types/other.type'
import { z } from 'zod'

const isRichTextEmpty = (html: string) => {
  const stripped = html.replace(/<[^>]*>?/gm, '').trim()
  return stripped.length === 0
}

const BaseSprintFormSchema = z.object({
  title: stringSchema,
  storyPoint: z.coerce
    .number()
    .positive({ message: messages.validation.sprint.form.storyPoint }),
  description: z.coerce.string().refine((val) => !isRichTextEmpty(val), {
    message: messages.validation.sprint.form.description
  }),
  start: z.date(),
  predict: z.date(),
  end: z.date()
})

const CreateSprintFormSchema = BaseSprintFormSchema.refine(
  (data) => data.start <= data.end,
  {
    message: messages.validation.sprint.form.endDate,
    path: ['end']
  }
).refine((data) => data.start < data.predict && data.predict < data.end, {
  message: messages.validation.sprint.form.predict,
  path: ['predict']
})

const UpdateSprintFormSchema = BaseSprintFormSchema.extend({
  id: z.string(),
  position: z.number().optional()
})
  .refine((data) => data.start <= data.end, {
    message: messages.validation.sprint.form.endDate,
    path: ['end']
  })
  .refine((data) => data.start < data.predict && data.predict < data.end, {
    message: messages.validation.sprint.form.predict,
    path: ['predict']
  })
type BaseSprintFormType = z.infer<typeof BaseSprintFormSchema>
type CreateSprintFormType = z.infer<typeof CreateSprintFormSchema>
type UpdateSprintFormType = z.infer<typeof UpdateSprintFormSchema>
const UpdateSprintForStudentFormSchema = z.object({
  datePlanning: z.coerce.date(),
  datePreview: z.coerce.date()
})
type UpdateSprintForStudentFormType = z.infer<
  typeof UpdateSprintForStudentFormSchema
>
type UpdateSprintForStudentRequest = {
  projectId: Id
  sprintId: Id
  dtPlanning: Date
  dtPreview: Date
}
type UpdateSprintRequest = UpdateSprintFormType
type CreateSprintRequest = CreateSprintFormType & {
  workspaceId: Id
  position?: number
}
type SprintResponse = SprintModel

type SprintWorkspaceDataTable = SprintModel

type SprintOverview = Pick<SprintModel, 'id' | 'start' | 'end'>

export {
  BaseSprintFormSchema,
  CreateSprintFormSchema,
  UpdateSprintFormSchema,
  UpdateSprintForStudentFormSchema
}
export type {
  BaseSprintFormType,
  CreateSprintFormType,
  CreateSprintRequest,
  SprintResponse,
  SprintWorkspaceDataTable,
  UpdateSprintFormType,
  UpdateSprintRequest,
  SprintOverview,
  UpdateSprintForStudentRequest,
  UpdateSprintForStudentFormType
}
