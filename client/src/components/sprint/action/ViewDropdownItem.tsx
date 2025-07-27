import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import messages from '@/constant/message.const'
import useOpenIssueView from '@/hooks/use-issue-view'
import { Id } from '@/types/other.type'
type ViewDropdownItemProps = {
  id: Id
}

const ViewDropdownItem = ({ id }: ViewDropdownItemProps) => {
  const message = messages.component.sprint.viewDropdownItem
  const { action } = useOpenIssueView()
  return (
    <DropdownMenuItem
      onClick={() => {
        action(id)
      }}
    >
      {message.dropdown.view}
    </DropdownMenuItem>
  )
}

export default ViewDropdownItem
