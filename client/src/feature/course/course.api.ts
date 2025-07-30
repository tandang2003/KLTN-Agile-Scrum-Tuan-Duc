import { getErrorMessage } from '@/lib/form'
import courseService from '@/services/course.service'
import {
  CourseResponseType,
  CreateCourseRequestType,
  UserCourseResponseType
} from '@/types/course.type'
import { Id } from '@/types/other.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: () => ({ data: {} }), // you likely want to replace this with fetchBaseQuery if not using custom service
  tagTypes: ['Courses', 'CoursesUser'],
  endpoints: (builder) => ({
    getAllCourse: builder.query<Array<CourseResponseType>, void>({
      async queryFn() {
        try {
          const data = await courseService.getListCourse()
          return { data }
        } catch (error) {
          return { error }
        }
      }
    }),
    getCourseById: builder.query<CourseResponseType, Id>({
      async queryFn(id) {
        try {
          const data = await courseService.getCourseById(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_, __, id) => [{ type: 'Courses', id }]
    }),
    getDependentCourse: builder.query<Array<CourseResponseType>, Id>({
      async queryFn(id) {
        try {
          const data = await courseService.getListDependentCourse(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_, __, id) => [{ type: 'Courses', id }]
    }),
    getPrerequisiteCourse: builder.query<Array<CourseResponseType>, Id>({
      async queryFn(id) {
        try {
          const data = await courseService.getListPrerequisiteCourse(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_, __, id) => [{ type: 'Courses', id }]
    }),
    getCourseOfUser: builder.query<Array<UserCourseResponseType>, void>({
      async queryFn() {
        try {
          const data = await courseService.getListCourseUser()
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: () => {
        return [
          {
            type: 'CoursesUser' as const,
            id: 'LIST'
          }
        ]
      }
    }),
    createCourse: builder.mutation<
      UserCourseResponseType[],
      CreateCourseRequestType
    >({
      async queryFn(arg) {
        try {
          const data = await courseService.addCourse(arg)
          return { data: data }
        } catch (error) {
          return {
            error: getErrorMessage(error)
          }
        }
      },
      invalidatesTags: (_, error) =>
        error
          ? []
          : [
              {
                type: 'CoursesUser' as const,
                id: 'LIST'
              }
            ]
    }),
    createCourseByPass: builder.mutation<
      UserCourseResponseType[],
      CreateCourseRequestType
    >({
      async queryFn(arg) {
        try {
          const data = await courseService.addCourseByPass(arg)
          return { data: data }
        } catch (error) {
          return {
            error: getErrorMessage(error)
          }
        }
      },
      invalidatesTags: (_, error) =>
        error
          ? []
          : [
              {
                type: 'CoursesUser' as const,
                id: 'LIST'
              }
            ]
    })
  })
})

export default courseApi
export const {
  useCreateCourseByPassMutation,
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useGetCourseByIdQuery,
  useGetDependentCourseQuery,
  useGetPrerequisiteCourseQuery,
  useGetCourseOfUserQuery
} = courseApi
