import IssueModel from '@/types/model/issue.model'
import { UserModel } from '@/types/model/user.model'
import { Id } from '@/types/other.type'

type IssueResponse = Pick<
  IssueModel,
  'id' | 'title' | 'position' | 'status' | 'dtStart' | 'dtEnd' | 'storyPoint'
> & {
  projectId: Id
  sprintId: Id
  assigner?: Pick<UserModel, 'id' | 'email' | 'name'>
  reviewer?: Pick<UserModel, 'id' | 'email' | 'name'>
}
export type { IssueResponse }
