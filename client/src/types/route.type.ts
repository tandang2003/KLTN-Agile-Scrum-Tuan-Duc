import { RoleType } from '@/types/auth.type'
import { Id } from '@/types/other.type'

type ProjectParams = {
  projectId: Id
  currentSprintId?: Id
}

type WorkspaceParams = {
  workspaceId: string
}

type InviteProjectParams = {
  token: string
}

type ManagerLayoutContextType = {
  user: {
    id: Id
    name: string
    uniId: string
    role: RoleType
  }
}

export type {
  ProjectParams,
  WorkspaceParams,
  InviteProjectParams,
  ManagerLayoutContextType
}
