import { CommentResType } from '@/types/comment.type'
import { PageRequest } from '@/types/http.type'
import { IssueRelationShip } from '@/types/model/relationship'
import { IssuePriority, IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { UserResponse } from '@/types/user.type'

type ProjectNotificationRequest = PageRequest

type LogType = 'CREATE' | 'UPDATE' | 'DELETE'

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

type ResourceResponse = {
  id: string
  name: string
  extension: string
  contentType: string
  size: number
  url: string
}

type NotificationOfIssueResponse = {
  sprintId: Id
  name: string
  assignee: UserResponse
  reviewer: UserResponse
  status: IssueStatus
  priority: IssuePriority
  dtStart: Date
  dtEnd: Date
  dtPlanning: Date
  dtPredictComplete: Date
  complexDescription: number
  topics: TopicResponse[]
  subTask: SubTaskResponse[]
  attachment: ResourceResponse[]
  comments: CommentResType[]
  relations: IssueRelationShip[]
  open: boolean
}

type NotificationResponse = {
  type: LogType
  entityTarget: string
  propertiesTargets: string[]
  change: NotificationOfIssueResponse
  dtCreated: Date
  createdBy: string
}

export type { ProjectNotificationRequest, NotificationResponse }
