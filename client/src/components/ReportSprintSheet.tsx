import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

type ReportSprintSheetProps = {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const ReportSprintSheet = ({
  isOpen,
  onOpenChange
}: ReportSprintSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Report</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'></div>
        <SheetFooter>
          <Button type='submit'>Save changes</Button>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ReportSprintSheet
