import Empty from '@/components/Empty'
import InfiniteScrollList from '@/components/InfiniteScrollList'
import NotificationItem from '@/components/notification/NotificationItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLazyGetProjectNotificationsQuery } from '@/feature/notification/notification.api'
import useAppId from '@/hooks/use-app-id'
import { uuid } from '@/lib/utils'
import { NotificationResponse } from '@/types/notification.type'
import { Id } from '@/types/other.type'

type NotificationListProps = {}

const NotificationList = ({}: NotificationListProps) => {
  const { projectId } = useAppId()

  const [trigger] = useLazyGetProjectNotificationsQuery()

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
      <ScrollArea className='my-4 h-[calc(100%-100px)] min-w-[100px]'>
        <InfiniteScrollList<NotificationResponse>
          loadFunc={loadFunc}
          className='mr-3 flex flex-col gap-3'
          render={(item) => {
            return <NotificationItem key={uuid()} data={item} />
          }}
          loading={<div style={{ color: 'red' }}>Loading...</div>}
          fallback={<Empty>Không có thông báo</Empty>}
        />
      </ScrollArea>
    </>
  )
}

export default NotificationList
