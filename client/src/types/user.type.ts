import { UserModel } from '@/types/model/user.model'
import { WorkSpaceModel } from '@/types/model/workspace.model'

type UserResponse = Pick<UserModel, 'id' | 'uniId' | 'name'> & {
  workspaces: Pick<WorkSpaceModel, 'id' | 'name'>[]
}

export type { UserResponse }
