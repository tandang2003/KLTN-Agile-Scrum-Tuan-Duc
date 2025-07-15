import Icon from '@/components/Icon'
import { Id } from '@/types/other.type'
import { lazy, Suspense, useState } from 'react'

const LazyReportSprintSheet = lazy(
  () => import('@/components/report/ReportByProject')
)

type ReportColumnsActionProps = {
  projectId: Id
}

const ReportColumnsAction = ({ projectId }: ReportColumnsActionProps) => {
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false) // track if opened at least once

  const handleOpen = () => {
    setHasOpened(true)
    setOpen(true)
  }

  return (
    <>
      <div
        className='hover-opacity flex items-center gap-2 hover:underline'
        onClick={handleOpen}
      >
        <span>Xem báo cáo</span>
        <Icon icon={'uiw:right'} size={20} />
      </div>

      {/* Lazy load once it has ever been opened */}
      {hasOpened && (
        <Suspense fallback={null}>
          <LazyReportSprintSheet
            projectId={projectId}
            isOpen={open}
            onOpenChange={setOpen}
          />
        </Suspense>
      )}
    </>
  )
}
export default ReportColumnsAction
