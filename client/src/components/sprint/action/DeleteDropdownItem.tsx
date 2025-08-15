import { useAlertHost } from '@/components/AlertHost'
import Message from '@/components/Message'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import messages from '@/constant/message.const'
import {
  useDeleteIssueInBacklogMutation,
  useDeleteIssueMutation
} from '@/feature/issue/issue.api'
import { IssueStatus } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import { toast } from 'sonner'
type DeleteDropdownItemProps = {
  id: Id
  name: string
  status: IssueStatus
  sprintId?: Id
  projectId: Id
}

const DeleteDropdownItem = ({
  id,
  name,
  sprintId
}: DeleteDropdownItemProps) => {
  const message = messages.component.sprint.deleteDropdownItem
  const [deleteIssue] = useDeleteIssueMutation()
  const [deleteIssueInBacklog] = useDeleteIssueInBacklogMutation()
  const { showAlert } = useAlertHost()
  const handleDelete = () => {
    showAlert({
      title: message.alert.title,
      type: 'warning',
      message: (
        <Message
          template={message.alert.message}
          values={{
            name: name
          }}
        />
      ),
      onConfirm: () => {
        if (sprintId)
          return deleteIssue(id)
            .unwrap()
            .then(() => {
              toast.success(message.toast.success)
            })
            .catch(() => {
              toast.error(message.toast.failed)
            })
        else {
          return deleteIssueInBacklog(id)
            .unwrap()
            .then(() => {
              toast.success(message.toast.success)
            })
            .catch(() => {
              toast.error(message.toast.failed)
            })
        }
      }
    })
  }
  return (
    <DropdownMenuItem className='cancel' onClick={handleDelete}>
      {message.dropdown.delete}
    </DropdownMenuItem>
  )
}

export default DeleteDropdownItem
