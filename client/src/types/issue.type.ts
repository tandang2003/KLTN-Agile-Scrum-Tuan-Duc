import { dateRange, string } from '@/types/common.type'
import {
  IssuePriority,
  issuePriorityList,
  IssueStatus,
  IssueTag,
  issueTagList
} from '@/types/model/typeOf'
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
  start?: Date
  end?: Date
}

type IssueDetailResponse = Omit<IssueResponse, 'start' | 'end'> & {
  storyPoint: number
  description: string
  dtStart?: Date
  dtEnd?: Date
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
    priority: z.enum(issuePriorityList),
    tag: z.enum(issueTagList),
    topics: z.array(TopicModelSchema),
    assigneeId: z.string(),
    reviewerId: z.string(),
    subTasks: z.array(CreateSubTaskSchema).optional(),
    date: dateRange
  })
  .partial()
  .extend({
    name: string
  })

const CreateIssueSchema = BaseIssueSchema

const UpdateIssueSchema = BaseIssueSchema.extend({
  id: string,
  name: string.optional()
})

type BaseIssueFormType = z.infer<typeof BaseIssueSchema>

type CreateIssueType = z.infer<typeof CreateIssueSchema>

type UpdateIssueType = z.infer<typeof UpdateIssueSchema>

type CreateIssueRequest = CreateIssueType & {
  projectId: Id
}

type KeyOfFieldChangingIssue =
  | keyof UpdateIssueType
  | 'start'
  | 'end'
  | 'assignee'
  | 'reviewer'

type UpdateIssueRequest = {
  id: Id
  fieldChanging: KeyOfFieldChangingIssue
  assignee?: string
  reviewer?: string
  start?: Date
  end?: Date
} & UpdateIssueType

export {
  BaseIssueSchema,
  CreateIssueSchema,
  TopicModelSchema,
  UpdateIssueSchema
}
export type {
  BaseIssueFormType,
  CreateIssueRequest,
  CreateIssueType,
  IssueDetailResponse,
  IssueResponse,
  KeyOfFieldChangingIssue,
  TopicModelType,
  UpdateIssueRequest,
  UpdateIssueType
}
