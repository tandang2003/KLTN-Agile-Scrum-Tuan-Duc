import { UserModel } from '@/types/model/user.model'
import { UniqueIdentifier } from '@dnd-kit/core'

type WorkSpaceModel = {
  id: UniqueIdentifier
  name: string
  owner: UserModel
  description?: string
  numSprint: number
  timePerSprint: number
  start: Date
  end: Date
}

export type { WorkSpaceModel }
