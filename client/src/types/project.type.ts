import { ProjectModel } from '@/types/model/project.model'
import { Id } from '@/types/other.type'
import { SprintResponse } from '@/types/sprint.type'
import { z } from 'zod'

const CreateProjectForm = z.object({
  name: z.string(),
  description: z.string()
})

type CreateProjectFormType = z.infer<typeof CreateProjectForm>
type ProjectResponse = Pick<ProjectModel, 'id' | 'name'>
type ProjectDetailResponse = ProjectModel & {
  currentSprint: SprintResponse
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
