import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import messages from '@/constant/message.const'

type ReportSprintSheetTeacherProps = {
  isOpen?: boolean
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const ReportSprintSheetTeacher = ({
  children,
  isOpen,
  onOpenChange
}: ReportSprintSheetTeacherProps) => {
  const message = messages.component.reportSprintSheet

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className='min-w-[70vw]'>
        <SheetHeader>
          <SheetTitle>{message.title}</SheetTitle>

          <SheetDescription>{message.description}</SheetDescription>
        </SheetHeader>
        <ScrollArea className='h-[80%]'>
          {children}
          <ScrollBar orientation='vertical' />
        </ScrollArea>
        <SheetFooter className='mt-3'>
          <div className='flex w-full items-center justify-between'>
            <SheetClose asChild>
              <Button className='cancel ml-auto' variant='outline'>
                {message.close}
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ReportSprintSheetTeacher
