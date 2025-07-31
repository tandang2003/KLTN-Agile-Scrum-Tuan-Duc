import DialogController from '@/components/dialog/DialogController'
import CreateIssueForm from '@/components/issue/CreateIssueForm'
import { useSprintSelect } from '@/components/issue/IssueSelectSprintContext'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import messages from '@/constant/message.const'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { disableCreateIssue } from '@/feature/trigger/trigger.slice'

type DialogCreateIssueProps = {}

const DialogCreateIssue = ({}: DialogCreateIssueProps) => {
  const { isCreateIssue } = useAppSelector((state) => state.triggerSlice)
  const { sprint } = useSprintSelect()
  const dispatch = useAppDispatch()

  return (
    <DialogController
      open={isCreateIssue}
      onOpen={() => dispatch(disableCreateIssue())}
    >
      <DialogContent className='sm:max-w-[95vw]'>
        <DialogHeader>
          <DialogTitle>{messages.component.issue.create.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <ScrollArea className='h-[65vh] py-4'>
          <CreateIssueForm
            sprint={sprint ?? undefined}
            onSubmit={() => dispatch(disableCreateIssue())}
          />
        </ScrollArea>
      </DialogContent>
    </DialogController>
  )
}

export default DialogCreateIssue
