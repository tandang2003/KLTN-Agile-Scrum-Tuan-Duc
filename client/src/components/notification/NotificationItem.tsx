import Icon from '@/components/Icon'
import { NotificationResponse } from '@/types/notification.type'
import { formatDistanceToNow } from 'date-fns'

export function formatNotification(notification: NotificationResponse) {
  const { type, change, createdBy, entityTarget } = notification

  let message = ''
  let icon = <></>

  switch (type) {
    case 'CREATE':
      icon = <Icon icon={'lucide:plus'} className='text-green-500' size={16} />
      message = `${createdBy} created ${entityTarget}: "${change.name}"`
      break
    case 'UPDATE':
      icon = <Icon icon={'lucide:pencil'} className='text-blue-500' size={16} />
      message = `${createdBy} updated ${entityTarget}: "${change.name}"`
      break
    case 'DELETE':
      icon = <Icon icon={'lucide:trash-2'} className='text-red-500' size={16} />
      message = `${createdBy} deleted ${entityTarget}: "${change.name}"`
      break
    default:
      message = 'Unknown action'
  }

  return { message, icon }
}

type NotificationItemProps = {
  data: NotificationResponse
}

const NotificationItem = ({ data }: NotificationItemProps) => {
  const timeAgo = formatDistanceToNow(new Date(data.dtCreated), {
    addSuffix: true
  })
  const { icon, message } = formatNotification(data)
  return (
    <div className='flex items-start gap-2 rounded-md border bg-white p-4 shadow-sm'>
      <div>{icon}</div>
      <div>
        <p className='text-sm text-gray-700'>{message}</p>
        <p className='text-xs text-gray-400'>{timeAgo}</p>
      </div>
    </div>
  )
}

export default NotificationItem
