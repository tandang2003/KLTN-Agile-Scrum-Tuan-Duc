import IssueModel from '@/types/model/issue.model'
import { IssuePriority, IssueStatus, IssueTag } from '@/types/model/typeOf'
import { UserModel } from '@/types/model/user.model'
import { Id } from '@/types/other.type'
import { z } from 'zod'

type IssueResponse = Pick<
  IssueModel,
  'id' | 'title' | 'position' | 'status' | 'dtStart' | 'dtEnd' | 'storyPoint'
> & {
  projectId: Id
  sprintId: Id
  assigner?: Pick<UserModel, 'id' | 'email' | 'name'>
  reviewer?: Pick<UserModel, 'id' | 'email' | 'name'>
}

const CreateIssueSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.string().optional(),
  storyPoint: z.coerce.number(),
  priority: z.string().optional(),
  tag: z.string().optional(),
  assignerId: z.string().optional(),
  reviewerId: z.string().optional(),
  start: z.date(),
  end: z.date()
})

type CreateIssueRequest = z.infer<typeof CreateIssueSchema>

type FieldChangingIssue = Partial<{
  name: string
  description: string
  priority: IssuePriority
  status: IssueStatus
  tag: IssueTag
  position: number
  topics: { id: Id; name: string; color: string }[]
  subTask: { id: Id; name: string; order: number; checked: boolean }[]
  attachments: string[]
  start: Date
  end: Date
  planning: Date
  complexOfDescription: number
  fieldChanging: FieldChangingIssue
}>

type KeyOfFieldChangingIssue = keyof FieldChangingIssue

type UpdateIssueRequest = {
  id: Id
  fieldChanging: KeyOfFieldChangingIssue
} & FieldChangingIssue

export type {
  IssueResponse,
  CreateIssueRequest,
  UpdateIssueRequest,
  FieldChangingIssue,
  KeyOfFieldChangingIssue
}
export { CreateIssueSchema }
