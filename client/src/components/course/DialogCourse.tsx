import DialogController from '@/components/dialog/DialogController'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { disableDialogCourse } from '@/feature/trigger/trigger.slice'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

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
      </DialogContent>
    </DialogController>
  )
}

export default DialogCourse
