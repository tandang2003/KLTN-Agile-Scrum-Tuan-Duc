import { BaseModel } from '@/types/model/base.model'
import { IssuePriority, IssueStatus, IssueTag } from '@/types/model/typeOf'

import { UserModel } from '@/types/model/user.model'

type IssueModel = BaseModel & {
  title: string
  position: number
  description: string
  projectSprint: any
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
export default IssueModel
