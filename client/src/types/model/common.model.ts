import { Id } from '@/types/other.type'

type TopicModel = {
  id: Id
  name: string
  color?: string
}
type SubTaskModel = {
  id: Id
  name: string
  order: string
  checked: boolean
}

type AttachmentModel = {
  resourceId: string
}

export type { TopicModel, SubTaskModel, AttachmentModel }
