import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import CreateWorkspaceForm from '@/components/workspace/CreateWorkspaceForm'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import messages from '@/constant/message.const'

type DialogCreateWorkspaceProps = {} & DialogControllerProps
const DialogCreateWorkspace = ({
  open,
  onOpen
}: DialogCreateWorkspaceProps) => {
  const message = messages.component.dialogCreateWorkspace
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[70vw]'>
        <DialogHeader>
          <DialogTitle>{message.title}</DialogTitle>
          <DialogDescription>{message.description}</DialogDescription>
        </DialogHeader>
        <CreateWorkspaceForm />
      </DialogContent>
    </DialogController>
  )
}

export default DialogCreateWorkspace
