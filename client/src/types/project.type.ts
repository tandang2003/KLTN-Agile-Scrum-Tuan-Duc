import { ProjectModel } from '@/types/model/project.model'
import { Id } from '@/types/other.type'
import { z } from 'zod'

const CreateProjectForm = z.object({
  name: z.string(),
  description: z.string()
})

type CreateProjectFormType = z.infer<typeof CreateProjectForm>
type ProjectResponse = Pick<ProjectModel, 'id' | 'name'>
type CreateProjectRequest = Omit<ProjectModel, 'id'> & {
  workspaceId: Id
  userId: Id
}

export type { CreateProjectFormType, ProjectResponse, CreateProjectRequest }
export { CreateProjectForm }
