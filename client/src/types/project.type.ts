import { ProjectModel } from '@/types/model/project.model'
import { Id } from '@/types/other.type'
import { z } from 'zod'

const CreateProjectForm = z.object({
  name: z.string(),
  description: z.string()
})

type CreateProjectFormType = z.infer<typeof CreateProjectForm>
type ProjectResponse = Pick<ProjectModel, 'id' | 'name'>
type CreateProjectRequest = CreateProjectFormType & {
  workspaceId: Id
  userId: Id
}

type TokenProjectResponse = {
  project_authorization_token: string
  project_ids: string[]
  project_id: string
}

export type {
  CreateProjectFormType,
  ProjectResponse,
  CreateProjectRequest,
  TokenProjectResponse
}
export { CreateProjectForm }
