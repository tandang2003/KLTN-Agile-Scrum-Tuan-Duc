import { BaseModel } from '@/types/model/base.model'
import {
  IssuePriorityEnum,
  IssueStatusEnum,
  IssueTagEnum
} from '@/types/model/enum'
import { UserModel } from '@/types/model/user.model'

type IssueModel = BaseModel & {
  title: string
  position: number
  description: string
  projectSprint: any
  status: IssueStatusEnum
  storyPoint: number
  priority: IssuePriorityEnum
  tag: IssueTagEnum
  numChangeOfPriority: number
  numChangeOfDescription: number
  complexOfDescription: number
  assigner: UserModel
  reviewer: UserModel
  dtStart: Date
  dtEnd: Date
  dtPlanning: Date
}
export default IssueModel
