import { string } from '@/types/common.type'
import { IssueModel } from '@/types/model/issue.model'
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

type TopicResponse = {
  id: string
  name: string
  color: string
}

type SubTaskResponse = {
  id: string
  name: string
  order: number
  checked: boolean
}

type AttachmentResponse = {
  id: string
  resourceId: string
}

type UserDetail = {
  id: string
  name: string
  email: string
  uniId: string
  role: string
}

type IssueResponse1 = {
  id: string
  name: string
  projectId: string
  sprintId: string
  status: IssueStatus
  priority: IssuePriority
  tag: IssueTag
  position: number
  assignee: UserDetail
  reviewer: UserDetail
  topics: TopicResponse[]
  subTasks: SubTaskResponse[]
  attachments: AttachmentResponse[]
  start: Date
  end: Date
}
const CreateSubTaskSchema = z.object({
  name: string
})

const TopicModel = z.object({
  id: z.string(),
  name: z.string()
})

const CreateIssueSchema = z.object({
  name: string,
  description: string.optional(),
  sprintId: string.optional(),
  status: string.optional(),
  priority: string.optional(),
  tag: string.optional(),
  topics: z.array(TopicModel).optional(),
  assigneeId: z.string().optional(),
  reviewerId: z.string().optional(),
  subTasks: z.array(CreateSubTaskSchema).optional(),
  start: z.date(),
  end: z.date()
})

type CreateIssueType = z.infer<typeof CreateIssueSchema>

type CreateIssueRequest = CreateIssueType & {
  projectId: Id
}

type IssueDetailResponse = IssueResponse1 & {
  description: string
}

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
  CreateIssueType,
  UpdateIssueRequest,
  FieldChangingIssue,
  KeyOfFieldChangingIssue,
  CreateIssueRequest
}
export { CreateIssueSchema }
export type { IssueResponse1, IssueDetailResponse }
