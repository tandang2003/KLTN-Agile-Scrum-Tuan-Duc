import Icon from '@/components/Icon'
import ReportSprintSheet from '@/components/ReportSprintSheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
type SprintColumnsActionProps = {}

const SprintColumnsAction = ({}: SprintColumnsActionProps) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon icon={'ri:more-fill'} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ReportSprintSheet isOpen={open} onOpenChange={setOpen} />
    </>
  )
}

export default SprintColumnsAction
