import { UserModel } from '@/types/model/user.model'
import { WorkSpaceModel } from '@/types/model/workspace.model'
import { WorkspaceSideBar } from '@/types/workspace.type'

type UserResponse = Pick<UserModel, 'id' | 'uniId' | 'name' | 'role'> & {
  workspaces: WorkspaceSideBar[]
}

export type { UserResponse }
