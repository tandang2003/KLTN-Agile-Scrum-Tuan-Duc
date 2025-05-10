import { Id } from '@/types/other.type'

type ProjectModel = {
  id: Id
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export type { ProjectModel }
