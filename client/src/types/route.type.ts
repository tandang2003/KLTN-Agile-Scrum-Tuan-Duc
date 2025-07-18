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

type UserLayoutContextType = {
  user: {
    id: Id
    name: string
    uniId: string
    role: RoleType
    avatar?: string
  }
}

type ReportDisplayType = 'project' | 'sprint'

export type {
  ProjectParams,
  WorkspaceParams,
  InviteProjectParams,
  UserLayoutContextType,
  ReportDisplayType
}
