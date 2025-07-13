import { Button } from '@/components/ui/button'
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
      <SheetContent className='min-w-[90vw]'>
        <SheetHeader>
          <SheetTitle>{message.title}</SheetTitle>

          <SheetDescription>{message.description}</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter className='mt-3'>
          <div className='flex w-full items-center justify-between'>
            <SheetClose asChild>
              <Button className='cancel' variant='outline'>
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
