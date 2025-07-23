import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import messages from '@/constant/message.const'
import useOpenIssueUpdate from '@/hooks/use-issue-update'
import { Id } from '@/types/other.type'
type UpdateDropdownItemProps = {
  id: Id
}

const UpdateDropdownItem = ({ id }: UpdateDropdownItemProps) => {
  const message = messages.component.sprint.updateDropdownItem
  const { action } = useOpenIssueUpdate()

  return (
    <DropdownMenuItem
      onClick={() => {
        action(id)
      }}
    >
      {message.dropdown.edit}
    </DropdownMenuItem>
  )
}

export default UpdateDropdownItem
