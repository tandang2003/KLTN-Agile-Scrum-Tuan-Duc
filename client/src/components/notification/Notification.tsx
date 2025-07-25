import Icon from '@/components/Icon'
import NotificationList from '@/components/notification/NotificationList'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { disableNotification } from '@/feature/trigger/trigger.slice'
import { cn } from '@/lib/utils'
type NotificationProps = {}

const Notification = ({}: NotificationProps) => {
  const isNotify = useAppSelector((state) => state.triggerSlice.isNotify)
  const dispatch = useAppDispatch()
  return (
    <Popover
      onOpenChange={(open) => {
        if (open) {
          dispatch(disableNotification())
        }
      }}
    >
      <PopoverTrigger className={cn('hover-opacity', isNotify && 'relative')}>
        <Icon icon={'mdi:bell-outline'} size={30} />
        {isNotify && (
          <span className='absolute top-0 right-0 flex size-3'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
            <span className='relative inline-flex size-3 rounded-full bg-red-500'></span>
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align='end'>
        <NotificationList />
      </PopoverContent>
    </Popover>
  )
}

export default Notification
