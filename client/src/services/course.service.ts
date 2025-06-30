import httpService from '@/services/http.service'
import {
  CourseResponseType,
  CreateCourseRequestType,
  UserCourseResponseType
} from '@/types/course.type'
import { ResponseApi } from '@/types/http.type'
import { Id } from '@/types/other.type'

const courseService = {
  getListCourse: async () => {
    const res =
      await httpService.get<ResponseApi<CourseResponseType[]>>(`/course/list`)
    return res.data.data
  },
  getCourseById: async (id: Id) => {
    const res = await httpService.get<ResponseApi<CourseResponseType>>(
      `/course/${id}`
    )
    return res.data.data
  },
  getListDependentCourse: async (id: Id) => {
    const res = await httpService.get<ResponseApi<CourseResponseType[]>>(
      `/course/${id}/dependent`
    )
    return res.data.data
  },
  getListPrerequisiteCourse: async (id: Id) => {
    const res = await httpService.get<ResponseApi<CourseResponseType[]>>(
      `/course/${id}/prerequisite`
    )
    return res.data.data
  },
  getListCourseUser: async () => {
    const res =
      await httpService.get<ResponseApi<UserCourseResponseType[]>>(
        `/course/user`
      )
    return res.data.data
  },
  addCourse: async (req: CreateCourseRequestType) => {
    const res = await httpService.put<
      ResponseApi<UserCourseResponseType[]>,
      {
        coursePoints: CreateCourseRequestType
      }
    >(`/course`, {
      coursePoints: req
    })
    return res.data.data
  }
}
export default courseService
