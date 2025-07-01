import DialogController from '@/components/dialog/DialogController'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { disableDialogCourse } from '@/feature/trigger/trigger.slice'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import FormCreateCourse from '@/components/course/FormCreateCource'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const DialogCourse = () => {
  const dispatch = useAppDispatch()
  const { isOpenDialogCourse } = useAppSelector((state) => state.triggerSlice)
  const handleCloseDialog = () => {
    dispatch(disableDialogCourse())
  }
  return (
    <DialogController
      open={isOpenDialogCourse}
      onOpen={() => handleCloseDialog()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Môn học</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <ScrollArea className='max-h-[300px]'>
          <div className='mr-3'>
            <FormCreateCourse />
          </div>
          <ScrollBar />
        </ScrollArea>
      </DialogContent>
    </DialogController>
  )
}

export default DialogCourse
