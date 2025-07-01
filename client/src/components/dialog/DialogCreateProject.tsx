import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import CreateProjectForm from '@/components/project/CreateProjectForm'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type DialogCreateProjectProps = {} & DialogControllerProps
const DialogCreateProject = ({ open, onOpen }: DialogCreateProjectProps) => {
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[70vw]'>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm setOpenDialog={onOpen} />
      </DialogContent>
    </DialogController>
  )
}
export { DialogCreateProject }
