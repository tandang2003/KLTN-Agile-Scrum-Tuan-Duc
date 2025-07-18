import { UserModel } from '@/types/model/user.model'
import { Id } from '@/types/other.type'

type WorkSpaceModel = {
  id: Id
  name: string
  owner: UserModel
  description?: string
  sprintNum: number
  timePerSprint: number
  start: Date
  end: Date
}

export type { WorkSpaceModel }
