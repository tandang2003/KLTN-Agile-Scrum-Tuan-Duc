import BadgeSprint from '@/components/badge/BadgeSprint'
import BadgeSprintResult from '@/components/badge/BadgeSprintResult'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import messages from '@/constant/message.const'
import { useGetResultQuery } from '@/feature/project/project.api'
import useAppId from '@/hooks/use-app-id'
import useSprintCurrent from '@/hooks/use-sprint-current'
import {
  sortSprintsByDateStart,
  sortSprintsResultByDateStart
} from '@/lib/sprint.helper'
import { formatDate } from '@/lib/utils'
import { Id } from '@/types/other.type'
import { SprintResultResponse } from '@/types/sprint.type'
import { lazy, Suspense, useState } from 'react'
type SprintCollectionProps = {}

const SprintCollection = ({}: SprintCollectionProps) => {
  const message = messages.component.dataTable.sprint.columns
  const { projectId } = useAppId()

  const { data: sprints } = useGetResultQuery(
    {
      projectId: projectId as Id
    },
    {
      skip: !projectId
    }
  )
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>{message.title}</TableHead>
          <TableHead>{message.start}</TableHead>
          <TableHead>{message.end}</TableHead>
          <TableHead>{message.status}</TableHead>
          <TableHead>{message.predict}</TableHead>
          <TableHead>{message.predictSecond}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sprints &&
          sortSprintsResultByDateStart(sprints).map((item, index) => (
            <SprintCollectionRow order={index + 1} key={item.id} item={item} />
          ))}
      </TableBody>
    </Table>
  )
}

const LazySprintDashboardDetailSheet = lazy(
  () => import('@/components/dashboard/SprintDashboardDetailSheet')
)

type SprintCollectionRowProps = {
  order: number
  item: SprintResultResponse
}

const SprintCollectionRow = ({ order, item }: SprintCollectionRowProps) => {
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const [open, setOpen] = useState(false)
  const [hasOpened] = useState(false)

  return (
    <>
      <TableRow key={item.id}>
        <TableCell className='font-medium'>{order}</TableCell>
        <TableCell className='font-medium'>{item.title}</TableCell>
        <TableCell>{formatDate(item.start)}</TableCell>
        <TableCell>{formatDate(item.end)}</TableCell>
        <TableCell>
          <BadgeSprint
            status={getStatusSprint({
              id: item.id,
              end: item.end,
              start: item.start
            })}
          />
        </TableCell>
        <TableCell>
          <BadgeSprintResult
            status={item.predictResult}
            lastTime={item.predict}
          />
        </TableCell>
        <TableCell>
          <BadgeSprintResult
            status={item.predictResultSecond}
            lastTime={item.predictSecond}
          />
        </TableCell>
      </TableRow>

      {hasOpened && (
        <Suspense fallback={null}>
          <LazySprintDashboardDetailSheet
            sprint={item}
            isOpen={open}
            onOpenChange={setOpen}
          />
        </Suspense>
      )}
    </>
  )
}

export default SprintCollection
