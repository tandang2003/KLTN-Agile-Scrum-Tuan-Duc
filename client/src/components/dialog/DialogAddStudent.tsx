import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'

type DialogAddStudentProps = {} & DialogControllerProps

const DialogAddStudent = ({ open, onOpen }: DialogAddStudentProps) => {
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent
        className='sm:max-w-[70vw]'
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          document.body.style.pointerEvents = ''
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </DialogController>
  )
}

export default DialogAddStudent
