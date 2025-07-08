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
import messages from '@/constant/message.const'

type DialogCreateProjectProps = {} & DialogControllerProps
const DialogCreateProject = ({ open, onOpen }: DialogCreateProjectProps) => {
  const { description, title } = messages.component.project.dialog.invite
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[70vw]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <CreateProjectForm setOpenDialog={onOpen} />
      </DialogContent>
    </DialogController>
  )
}
export { DialogCreateProject }
