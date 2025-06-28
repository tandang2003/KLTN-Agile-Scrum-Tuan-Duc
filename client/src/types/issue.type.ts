import { dateRange, string } from '@/types/common.type'
import {
  IssuePriority,
  issuePriorityList,
  IssueStatus,
  IssueTag,
  issueTagList
} from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { RelationshipResponse } from '@/types/relationship.type'
import { z } from 'zod'

type TopicResponse = {
  id: string
  name: string
  color: string
}

type SubTaskResponse = {
  name: string
  order: number
  checked: boolean
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
  position: string
  assignee?: UserDetail
  reviewer?: UserDetail
  topics?: TopicResponse[]
  subtasks?: SubTaskResponse[]
  resources?: ResourceResponse[]
  start?: Date
  end?: Date
}

type IssueDetailResponse = Omit<IssueResponse, 'start' | 'end'> & {
  description: string
  dtStart?: Date
  dtEnd?: Date
  resources: ResourceResponse[]
  relations: RelationshipResponse[]
}

type ResourceResponse = {
  id: string
  name: string
  extension: string
  contentType: string
  size: number
  url: string
}

const SubTaskModelSchema = z.object({
  name: string,
  order: z.number(),
  checked: z.boolean()
})

const TopicModelSchema = z.object({
  id: z.string(),
  name: z.string()
})

type TopicModelType = z.infer<typeof TopicModelSchema>

const BaseIssueSchema = z
  .object({
    description: string,
    sprintId: z.string().optional(),
    status: string,
    priority: z.enum(issuePriorityList),
    tag: z.enum(issueTagList),
    topics: z.array(TopicModelSchema),
    assigneeId: z.string().optional(),
    reviewerId: z.string().optional(),
    subtasks: z.array(SubTaskModelSchema).optional(),
    date: dateRange.optional()
  })
  .partial()
  .extend({
    name: string
  })

const CreateIssueSchema = BaseIssueSchema.extend({
  sprint: z
    .object({
      id: z.string(),
      start: z.coerce.date().optional(),
      end: z.coerce.date().optional()
    })
    .optional(),
  position: z.string().nullable().optional()
})

const UpdateIssueSchema = BaseIssueSchema.extend({
  id: string,
  name: string.optional(),
  subtasks: z.array(SubTaskModelSchema).optional()
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
  | 'sprint'

type UpdateIssueRequest = {
  id: Id
  fieldChanging: KeyOfFieldChangingIssue
  assignee?: string
  reviewer?: string
  start?: Date
  end?: Date
} & UpdateIssueType

type UpdatePositionIssueRequest = {
  id: Id
  position?: string
  status: IssueStatus
}

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
  UpdateIssueType,
  UpdatePositionIssueRequest
}
