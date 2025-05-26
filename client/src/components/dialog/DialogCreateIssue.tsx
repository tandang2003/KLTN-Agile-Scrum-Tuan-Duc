import DialogController, {
  DialogControllerProps
} from '@/components/dialog/DialogController'
import CreateIssueForm from '@/components/issue/CreateIssueForm'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

type DialogCreateIssueProps = {} & DialogControllerProps

const DialogCreateIssue = ({ open, onOpen }: DialogCreateIssueProps) => {
  return (
    <DialogController open={open} onOpen={onOpen}>
      <DialogContent className='sm:max-w-[95vw]'>
        <DialogHeader>
          <DialogTitle>Create Issue</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <ScrollArea className='h-[65vh] py-4'>
          <CreateIssueForm onSubmit={() => onOpen(false)} />
        </ScrollArea>
      </DialogContent>
    </DialogController>
  )
}

export default DialogCreateIssue
