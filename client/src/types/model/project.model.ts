import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'

type ProjectModel = {
  id: Id
  name: string
  topics: []
  sprints: SprintModel[]
  description: string
  createdAt: Date
  updatedAt: Date
}

export type { ProjectModel }
