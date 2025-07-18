import Icon from '@/components/Icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import messages from '@/constant/message.const'
import useAppId from '@/hooks/use-app-id'
import { SprintOverview } from '@/types/sprint.type'
import { lazy, Suspense, useState } from 'react'

const LazyReportSprintSheet = lazy(
  () => import('@/components/ReportSprintSheet')
)

type SprintColumnsActionProps = {
  sprint: SprintOverview
  onlyView?: boolean
}

const SprintColumnsAction = ({
  sprint,
  onlyView = false
}: SprintColumnsActionProps) => {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false) // track if opened at least once
  const { projectId } = useAppId()

  const handleOpen = () => {
    setHasOpened(true)
    setOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon icon='ri:more-fill' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={handleOpen} className='hover-opacity'>
            {messages.component.dataTable.sprint.actions.report}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Lazy load once it has ever been opened */}
      {hasOpened && (
        <Suspense fallback={null}>
          <LazyReportSprintSheet
            projectId={projectId!}
            sprint={sprint}
            isOpen={open}
            disabled={onlyView}
            onOpenChange={setOpen}
          />
        </Suspense>
      )}
    </>
  )
}
export default SprintColumnsAction
