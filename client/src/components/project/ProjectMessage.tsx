import { MessageTitle } from '@/components/notification/NotificationItem'
import { ProjectMessageUpdateResponse } from '@/types/notification.type'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
type ProjectMessageProps = {
  data: ProjectMessageUpdateResponse
}

const ProjectMessage = ({ data }: ProjectMessageProps) => {
  const timeAgo = formatDistanceToNow(new Date(data.dtCreated), {
    addSuffix: true,
    locale: vi
  })

  return (
    <div className='flex flex-col gap-2'>
      <span>
        <MessageTitle
          createdBy={data.createdBy}
          property={data.propertiesTargets?.[0] ?? 'Unknow'}
          type={data.type}
        />
      </span>
      <span className='text-xs text-gray-400'>{timeAgo}</span>
    </div>
  )
}

export default ProjectMessage
