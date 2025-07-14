import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import messages, { getSprintStatusDisplayName } from '@/constant/message.const'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import useAppId from '@/hooks/use-app-id'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { formatDate } from '@/lib/utils'
import { SprintModel } from '@/types/model/sprint.model'
import { Id } from '@/types/other.type'
import { lazy, Suspense, useState } from 'react'
type SprintCollectionProps = {}

const SprintCollection = ({}: SprintCollectionProps) => {
  const message = messages.component.dataTable.sprint.columns
  const { workspaceId } = useAppId()
  const { data: sprints } = useGetListSprintQuery(workspaceId as Id, {
    skip: !workspaceId
  })
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>{message.title}</TableHead>
          <TableHead>{message.start}</TableHead>
          <TableHead>{message.end}</TableHead>
          <TableHead>{message.status}</TableHead>
          <TableHead>{message.predictStatus}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sprints?.map((item, index) => (
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
  item: SprintModel
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
          <Badge
            statusSprint={getStatusSprint({
              id: item.id,
              end: item.end,
              start: item.start
            })}
          >
            {getSprintStatusDisplayName(
              getStatusSprint({
                id: item.id,
                end: item.end,
                start: item.start
              })
            )}
          </Badge>
        </TableCell>
        <TableCell>Thanh cong</TableCell>
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
