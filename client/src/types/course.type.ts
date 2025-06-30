import { Id } from '@/types/other.type'

type CourseResponseType = {
  id: Id
  name: string
  courseId: Id
}

type UserCourseResponseType = {
  course: CourseResponseType
  point: number
}

type CreateCourseRequestType = Record<Id, number>

export type {
  CourseResponseType,
  UserCourseResponseType,
  CreateCourseRequestType
}
