import Icon from '@/components/Icon'
import InfiniteScrollList from '@/components/InfiniteScrollList'
import NotificationItem from '@/components/notification/NotificationItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import messages from '@/constant/message.const'
import {
  useClearNotificationsMutation,
  useLazyGetProjectNotificationsQuery
} from '@/feature/notification/notification.api'
import useAppId from '@/hooks/use-app-id'
import { uuid } from '@/lib/utils'
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
        <span className='text-lg'>{messages.component.notification.title}</span>
        <Icon
          className='hover-opacity'
          icon={'mdi:reload'}
          size={20}
          onClick={handleClearNotification}
        />
      </div>
      <ScrollArea className='h-[30vh] min-w-[100px]'>
        <InfiniteScrollList<NotificationResponse>
          loadFunc={loadFunc}
          className='mr-3 flex flex-col gap-3'
          render={(item) => {
            return <NotificationItem key={uuid()} data={item} />
          }}
          loading={<div style={{ color: 'red' }}>Loading...</div>}
          fallback={<span className='text-gray-500'>Không có thông báo</span>}
        />
      </ScrollArea>
    </>
  )
}

export default NotificationList
