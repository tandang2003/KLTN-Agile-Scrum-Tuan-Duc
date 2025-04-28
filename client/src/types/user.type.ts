import { UserModel } from '@/types/model/user.model'
import { WorkspaceSideBar } from '@/types/workspace.type'

type UserResponse = Pick<UserModel, 'id' | 'uniId' | 'name' | 'role'> & {
  workspaces: {
    items: WorkspaceSideBar[]
  }
}

export type { UserResponse }
