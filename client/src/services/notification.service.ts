import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { Page, ResponseApi } from '@/types/http.type'
import {
  NotificationResponse,
  ProjectNotificationRequest
} from '@/types/notification.type'
import { Id } from '@/types/other.type'

const notificationService = {
  getNotification: async (
    projectId: Id,
    req: ProjectNotificationRequest
  ): Promise<Page<NotificationResponse>> => {
    const queryString = toQueryString(req)
    const response = await httpService.get<
      ResponseApi<Page<NotificationResponse>>
    >(`/project/${projectId}/notification?${queryString}`)

    return response.data.data
  }
}

export default notificationService
