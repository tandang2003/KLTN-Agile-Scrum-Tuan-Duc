import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import { lazy, ReactNode, Suspense, useState } from 'react'
type SprintCollectionProps = {
  children: ReactNode
}

const SprintCollection = () => {
  const message = messages.component.dataTable.sprint.columns
  const { workspaceId } = useAppId()
  const { data: sprints, isFetching } = useGetListSprintQuery(
    workspaceId as Id,
    {
      skip: !workspaceId
    }
  )
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{message.title}</TableHead>
          <TableHead>{message.start}</TableHead>
          <TableHead>{message.end}</TableHead>
          <TableHead>{message.status}</TableHead>
          <TableHead>{message.predictStatus}</TableHead>
          <TableHead className='text-right'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sprints?.map((item) => (
          <SprintCollectionRow key={item.id} item={item} />
        ))}
      </TableBody>
    </Table>
  )
}

const LazySprintDashboardDetailSheet = lazy(
  () => import('@/components/dashboard/SprintDashboardDetailSheet')
)

type SprintCollectionRowProps = {
  item: SprintModel
}

const SprintCollectionRow = ({ item }: SprintCollectionRowProps) => {
  const {
    util: { getStatusSprint }
  } = useSprintCurrent()
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const handleOpen = () => {
    setHasOpened(true)
    setOpen(true)
  }

  return (
    <>
      <TableRow key={item.id}>
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
        <TableCell className='text-right'>
          <Button variant={'link'} onClick={handleOpen}>
            Xem chi tiết
            <Icon icon={'lsicon:triangle-right-filled'} size={10} />
          </Button>
        </TableCell>
      </TableRow>

      {hasOpened && (
        <Suspense fallback={null}>
          <LazySprintDashboardDetailSheet
            isOpen={open}
            onOpenChange={setOpen}
          />
        </Suspense>
      )}
    </>
  )
}

export default SprintCollection
