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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import messages from '@/constant/message.const'
import { useClearNotificationsMutation } from '@/feature/notification/notification.api'
type NotificationProps = {}

const Notification = ({}: NotificationProps) => {
  const isNotify = useAppSelector((state) => state.triggerSlice.isNotify)
  const dispatch = useAppDispatch()
  const [clear] = useClearNotificationsMutation()

  const handleClearNotification = async () => {
    await clear()
  }
  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) {
          dispatch(disableNotification())
        }
      }}
    >
      <SheetTrigger className={cn('hover-opacity', isNotify && 'relative')}>
        <Icon icon={'mdi:bell-outline'} size={30} />
        {isNotify && (
          <span className='absolute top-0 right-0 flex size-3'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
            <span className='relative inline-flex size-3 rounded-full bg-red-500'></span>
          </span>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='flex items-center gap-3'>
            {messages.component.notification.title}

            <Button asChild>
              <Icon
                className='hover-opacity'
                icon={'mdi:reload'}
                size={20}
                onClick={handleClearNotification}
              />
            </Button>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <NotificationList />

        <SheetFooter>
          <SheetClose asChild>
            <Button variant='outline'>Đóng</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Notification
