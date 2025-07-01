import { Id } from '@/types/other.type'
import { z } from 'zod'

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

const CreateCourseSchema = z.object({
  courses: z
    .array(
      z.object({
        courseId: z.string().refine((val) => {
          return val.trim() !== ''
        }, 'Bạn cần chọn một môn học'),
        point: z.coerce
          .number()
          .min(0)
          .max(10)
          .refine((val) => {
            return !isNaN(val)
          }, 'Điểm phải là một số hợp lệ')
      })
    )
    .nonempty('Bạn cần chọn ít nhất một môn học')
    .refine((data) => {
      const courseIds = data.map((item) => item.courseId)
      return new Set(courseIds).size === courseIds.length
    }, 'Mỗi môn học chỉ được chọn một lần')
})

type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>

const CreateCourseSchemeParse = CreateCourseSchema.transform((data) => {
  const courseMap: Record<string, number> = {}
  for (const item of data.courses) {
    courseMap[item.courseId] = item.point
  }
  return courseMap
})

export { CreateCourseSchema, CreateCourseSchemeParse }

export type {
  CourseResponseType,
  UserCourseResponseType,
  CreateCourseRequestType,
  CreateCourseSchemaType
}
