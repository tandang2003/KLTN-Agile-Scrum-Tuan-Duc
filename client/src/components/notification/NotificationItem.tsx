import Icon from '@/components/Icon'
import {
  LogType,
  NotificationResponse,
  PropertyTarget
} from '@/types/notification.type'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useMemo } from 'react'

const MessageIcon = ({ type }: { type: LogType }) => {
  switch (type) {
    case 'CREATE':
      return <Icon icon='lucide:plus' className='text-green-500' size={16} />
    case 'UPDATE':
      return <Icon icon='lucide:pencil' className='text-blue-500' size={16} />
    case 'DELETE':
      return <Icon icon='lucide:trash-2' className='text-red-500' size={16} />
    default:
      return null
  }
}

const MessageTitle = ({
  type,
  property,
  createdBy
}: {
  type: LogType
  property: PropertyTarget | string
  createdBy: string
}) => {
  const typeResult = useMemo(() => {
    if (type == 'CREATE') {
      return 'tạo'
    }
    if (type == 'UPDATE') {
      return 'cập nhập'
    }
    if (type == 'DELETE') {
      return 'xóa'
    }
  }, [type])

  const propertyResult = useMemo(() => {
    let message = ''
    switch (property) {
      case 'name':
        message = 'Tên'
        break
      case 'description':
        message = 'Mô tả'
        break
      case 'sprint':
        message = 'Sprint'
        break
      case 'complexOfDescription':
        message = 'Mức độ phức tạp'
        break
      case 'priority':
        message = 'Độ ưu tiên'
        break
      case 'status':
        message = 'Trạng thái'
        break
      case 'topics':
        message = 'Chủ đề'
        break
      case 'subtasks':
        message = 'Công việc con'
        break
      case 'assignee':
        message = 'Người thực hiện'
        break
      case 'reviewer':
        message = 'Người kiểm tra'
        break
      case 'start':
        message = 'Ngày bắt đầu'
        break
      case 'end':
        message = 'Ngày kết thúc'
        break
      case 'attachments':
        message = 'Tệp đính kèm'
        break
      default:
        message = property
    }
    return message
  }, [property])

  if (typeResult !== 'cập nhập')
    return `${createdBy} đã thực hiện ${typeResult} issue`
  return `${createdBy} đã thực hiện ${typeResult} ${propertyResult}`
}

type NotificationItemProps = {
  data: NotificationResponse
}

const NotificationItem = ({ data }: NotificationItemProps) => {
  const timeAgo = formatDistanceToNow(new Date(data.dtCreated), {
    addSuffix: true,
    locale: vi
  })
  return (
    <div className='flex items-start gap-2 rounded-md border bg-white p-2 shadow-sm'>
      <div>
        <MessageIcon type={data.type} />
      </div>
      <div>
        <p className='text-sm text-gray-700'>
          <MessageTitle
            createdBy={data.createdBy}
            property={data.propertiesTargets?.[0] ?? 'Unknow'}
            type={data.type}
          />
        </p>
        <p className='text-xs text-gray-400'>{timeAgo}</p>
      </div>
    </div>
  )
}
export { MessageIcon, MessageTitle }
export default NotificationItem
