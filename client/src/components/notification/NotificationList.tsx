import Icon from '@/components/Icon'
import InfiniteScrollList from '@/components/InfiniteScrollList'
import NotificationItem from '@/components/notification/NotificationItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  useClearNotificationsMutation,
  useLazyGetProjectNotificationsQuery
} from '@/feature/notification/notification.api'
import useAppId from '@/hooks/use-app-id'
import { NotificationResponse } from '@/types/notification.type'
import { Id } from '@/types/other.type'

type NotificationListProps = {}

const NotificationList = ({}: NotificationListProps) => {
  const { projectId } = useAppId()

  const [clear] = useClearNotificationsMutation()
  const [trigger] = useLazyGetProjectNotificationsQuery()

  const handleClearNotification = async () => {
    await clear()
  }

  const loadFunc = async (
    page: number
  ): Promise<{ data: NotificationResponse[]; more: boolean }> => {
    const result = await trigger({
      projectId: projectId as Id,
      req: {
        page: page - 1,
        size: 4
      }
    }).unwrap()
    return {
      data: result.items,
      more: result.currentPage < result.totalPages
    }
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
      <ScrollArea className='h-[20vh]'>
        <InfiniteScrollList<NotificationResponse>
          loadFunc={loadFunc}
          className='flex flex-col gap-2'
          render={(item) => {
            return <NotificationItem data={item} />
          }}
          loading={<div style={{ color: 'red' }}>Loading...</div>}
          fallback={
            <span className='text-gray-500'>No notifications found</span>
          }
        />
      </ScrollArea>
    </>
  )
}

export default NotificationList
