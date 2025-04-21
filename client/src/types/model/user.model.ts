import { Id } from '@/types/other.type'

type UserModel = {
  id: Id
  email: string
  name: string
  className: string
  uniId: string
  uniPassword: string
  role: 'student' | 'teacher'
}

export type { UserModel }
