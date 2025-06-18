import { Id } from '@/types/other.type'
import { ResourceResponseType } from '@/types/resource.type'

type UserModel = {
  id: Id
  email: string
  name: string
  className: string
  uniId: string
  uniPassword: string
  role: 'student' | 'teacher'
  avatar?: ResourceResponseType
}

export type { UserModel }
