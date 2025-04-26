import CreateWorkspaceForm from '@/components/form/CreateWorkspaceForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type DialogCreateWorkspaceProps = {
  open: boolean
  onOpen: (open: boolean) => void
}
const DialogCreateWorkspace = ({
  open,
  onOpen
}: DialogCreateWorkspaceProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
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
    </Dialog>
  )
}

export default DialogCreateWorkspace
