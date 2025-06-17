import Icon from '@/components/Icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useAppId from '@/hooks/use-app-id'
import { useState, lazy, Suspense } from 'react'

const LazyReportSprintSheet = lazy(
  () => import('@/components/ReportSprintSheet')
)

type SprintColumnsActionProps = {
  sprintId: string
  onlyView?: boolean
}

const SprintColumnsAction = ({
  sprintId,
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
          <DropdownMenuItem onClick={handleOpen}>Report</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Lazy load once it has ever been opened */}
      {hasOpened && (
        <Suspense fallback={null}>
          <LazyReportSprintSheet
            projectId={projectId!}
            sprintId={sprintId}
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
