import Icon from '@/components/Icon'
import ListViewPagination from '@/components/ListViewPagination'
import NotificationItem from '@/components/notification/NotificationItem'
import {
  useClearNotificationsMutation,
  useGetProjectNotificationsQuery
} from '@/feature/notification/notification.api'
import useAppId from '@/hooks/use-app-id'
import {
  NotificationResponse,
  ProjectNotificationRequest
} from '@/types/notification.type'
import { Id } from '@/types/other.type'
import { useState } from 'react'

type NotificationListProps = {}

const NotificationList = ({}: NotificationListProps) => {
  const { projectId } = useAppId()
  const [page, setPage] = useState<ProjectNotificationRequest>({
    page: 0,
    size: 20
  })
  const [clear] = useClearNotificationsMutation()

  const { data: items, isFetching } = useGetProjectNotificationsQuery(
    {
      projectId: projectId as Id,
      req: {
        page: page.page,
        size: page.size
      }
    },
    {
      skip: !projectId
    }
  )

  const handleClearNotification = async () => {
    await clear()
  }

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <span className='text-lg'>Notification</span>
        <Icon
          className='hover-opacity'
          icon={'mdi:reload'}
          size={20}
          onClick={handleClearNotification}
        />
      </div>
      <ListViewPagination<NotificationResponse>
        page={items}
        onPageChange={(page) => {
          setPage((prev) => ({
            ...prev,
            page: page
          }))
        }}
        view={{
          loading: isFetching,
          emptyComponent: (
            <span className='text-gray-500'>No notifications found</span>
          ),
          render: (item) => {
            return <NotificationItem data={item} />
          }
        }}
      />
    </>
  )
}

export default NotificationList
