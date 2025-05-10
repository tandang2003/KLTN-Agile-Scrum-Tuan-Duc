import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import CreateSprintForm from '@/components/form/CreateSprintForm'
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type DialogCreateSprintProps = {} & DialogControllerProps
const DialogCreateSprint = ({ open, onOpen }: DialogCreateSprintProps) => {
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[50vw]'>
        <DialogHeader>
          <DialogTitle>Sprint</DialogTitle>
        </DialogHeader>
        <CreateSprintForm />
      </DialogContent>
    </DialogController>
  )
}

export default DialogCreateSprint
