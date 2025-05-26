import { string } from '@/types/common.type'
import { IssueModel } from '@/types/model/issue.model'
import { IssuePriority, IssueStatus, IssueTag } from '@/types/model/typeOf'
import { UserModel } from '@/types/model/user.model'
import { Id } from '@/types/other.type'
import { z } from 'zod'

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

type IssueResponse = {
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

const TopicModelSchema = z.object({
  id: z.string(),
  name: z.string()
})

type TopicModelType = z.infer<typeof TopicModelSchema>

const BaseIssueSchema = z
  .object({
    description: string,
    sprintId: string,
    status: string,
    priority: string,
    tag: string,
    topics: z.array(TopicModelSchema),
    assigneeId: z.string(),
    reviewerId: z.string(),
    subTasks: z.array(CreateSubTaskSchema)
  })
  .partial()
  .extend({
    name: string,
    start: z.date(),
    end: z.date()
  })

const CreateIssueSchema = BaseIssueSchema

const UpdateIssueSchema = BaseIssueSchema.extend({
  id: string,
  name: string.optional(),
  start: z.date().optional(),
  end: z.date().optional()
})

type BaseIssueFormType = z.infer<typeof BaseIssueSchema>

type CreateIssueType = z.infer<typeof CreateIssueSchema>

type UpdateIssueType = z.infer<typeof UpdateIssueSchema>

type CreateIssueRequest = CreateIssueType & {
  projectId: Id
}

type IssueDetailResponse = Omit<IssueResponse, 'start' | 'end'> & {
  storyPoint: number
  description: string
  dtStart: Date
  dtEnd: Date
}

type KeyOfFieldChangingIssue = keyof UpdateIssueType

type UpdateIssueRequest = {
  id: Id
  fieldChanging: KeyOfFieldChangingIssue
} & UpdateIssueType

export type {
  CreateIssueType,
  UpdateIssueRequest,
  KeyOfFieldChangingIssue,
  CreateIssueRequest
}
export {
  BaseIssueSchema,
  CreateIssueSchema,
  UpdateIssueSchema,
  TopicModelSchema
}
export type {
  IssueResponse,
  IssueDetailResponse,
  UpdateIssueType,
  TopicModelType,
  BaseIssueFormType
}
