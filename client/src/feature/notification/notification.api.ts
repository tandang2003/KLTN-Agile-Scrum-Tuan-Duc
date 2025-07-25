import notificationService from '@/services/notification.service'
import { Page } from '@/types/http.type'
import {
  NotificationResponse,
  ProjectNotificationRequest
} from '@/types/notification.type'
import { Id } from '@/types/other.type'
import { createApi } from '@reduxjs/toolkit/query/react'

const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: () => ({ data: {} }),
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    getProjectNotifications: builder.query<
      Page<NotificationResponse>,
      {
        projectId: Id
        req: ProjectNotificationRequest
      }
    >({
      async queryFn({ projectId, req }) {
        try {
          const data = await notificationService.getNotification(projectId, req)
          return { data }
        } catch (error) {
          return { error: '' }
        }
      },
      providesTags: ['Notifications']
    }),
    clearNotifications: builder.mutation<void, void>({
      queryFn: () => {
        return { data: undefined }
      },
      invalidatesTags: ['Notifications']
    })
  })
})

export default notificationApi

export const {
  useGetProjectNotificationsQuery,
  useClearNotificationsMutation,
  useLazyGetProjectNotificationsQuery
} = notificationApi
