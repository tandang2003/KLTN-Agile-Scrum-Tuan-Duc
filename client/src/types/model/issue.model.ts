import { BaseModel } from '@/types/model/base.model'
import { IssuePriority, IssueStatus, IssueTag } from '@/types/model/typeOf'

import { UserModel } from '@/types/model/user.model'
import { Id } from '@/types/other.type'

type IssueModel = BaseModel & {
  title: string
  position: number
  description: string
  status: IssueStatus
  storyPoint: number
  priority: IssuePriority
  tag: IssueTag
  numChangeOfPriority: number
  numChangeOfDescription: number
  complexOfDescription: number
  assigner?: UserModel
  reviewer?: UserModel
  dtStart: Date
  dtEnd: Date
  dtPlanning: Date
}

type SubTask = {
  id: Id
  name: string
  color: string
}

export default IssueModel
export type { SubTask }
