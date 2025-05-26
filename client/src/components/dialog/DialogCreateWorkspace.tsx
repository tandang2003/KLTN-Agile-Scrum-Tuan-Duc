import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import CreateWorkspaceForm from '@/components/form/CreateWorkspaceForm'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type DialogCreateWorkspaceProps = {} & DialogControllerProps
const DialogCreateWorkspace = ({
  open,
  onOpen
}: DialogCreateWorkspaceProps) => {
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[70vw]'>
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <CreateWorkspaceForm />
      </DialogContent>
    </DialogController>
  )
}

export default DialogCreateWorkspace
