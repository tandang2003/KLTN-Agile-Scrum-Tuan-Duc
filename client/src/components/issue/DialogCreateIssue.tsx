import DialogController from '@/components/dialog/DialogController'
import CreateIssueForm from '@/components/issue/CreateIssueForm'
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
import { parseStringToDate } from '@/lib/date.helper'

type DialogCreateIssueProps = {}

const DialogCreateIssue = ({}: DialogCreateIssueProps) => {
  const { isCreateIssue } = useAppSelector((state) => state.triggerSlice)
  const sprint = useAppSelector((state) => state.sprintSlice.active)
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
            sprint={
              sprint
                ? {
                    id: sprint.id,
                    start: parseStringToDate(sprint.start),
                    end: parseStringToDate(sprint.end)
                  }
                : undefined
            }
            onSubmit={() => dispatch(disableCreateIssue())}
          />
        </ScrollArea>
      </DialogContent>
    </DialogController>
  )
}

export default DialogCreateIssue
