import { ProjectModel } from '@/types/model/project.model'
import { Id, stringSchema } from '@/types/other.type'
import { SprintResponse } from '@/types/sprint.type'
import { z } from 'zod'

const CreateProjectForm = z.object({
  name: stringSchema,
  description: stringSchema
})

type CreateProjectFormType = z.infer<typeof CreateProjectForm>
type ProjectResponse = Pick<ProjectModel, 'id' | 'name'>
type ProjectDetailResponse = ProjectModel & {
  currentSprint?: SprintResponse
  prevSprint?: SprintResponse
  nextSprint?: SprintResponse
  leader: string
  totalEndedSprints: number
  completedSprints: number
}
type CreateProjectRequest = CreateProjectFormType & {
  workspaceId: Id
  userId: Id
}

type TokenProjectResponse = {
  project_authorization_token: Id
  project_ids?: Id[]
  project_id?: Id
}

type TokenProject = {
  token: string
  projectIds?: Id[]
  projectId?: Id
}

type InviteStudentProjectRequestType = {
  workspaceId: Id
  projectId: Id
  userId: Id[]
}

export type {
  CreateProjectFormType,
  ProjectResponse,
  CreateProjectRequest,
  TokenProjectResponse,
  ProjectDetailResponse,
  TokenProject,
  InviteStudentProjectRequestType
}
export { CreateProjectForm }
