import { UniqueIdentifier } from '@dnd-kit/core'

type ProjectModel = {
  id: UniqueIdentifier
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export type { ProjectModel }
