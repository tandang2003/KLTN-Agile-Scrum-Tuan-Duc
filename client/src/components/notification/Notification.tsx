import Icon from '@/components/Icon'
import NotificationList from '@/components/notification/NotificationList'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
type NotificationProps = {}

const Notification = ({}: NotificationProps) => {
  return (
    <Popover>
      <PopoverTrigger className='hover-opacity'>
        <Icon icon={'mdi:bell-outline'} size={30} />
      </PopoverTrigger>
      <PopoverContent align='end'>
        <NotificationList />
      </PopoverContent>
    </Popover>
  )
}

export default Notification
