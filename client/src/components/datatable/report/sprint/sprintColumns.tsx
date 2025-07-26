import BadgeSprint from '@/components/badge/BadgeSprint'
import ReportColumnsAction from '@/components/datatable/report/sprint/sprintColumnsAction'
import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import messages, { getSprintStatusDisplayName } from '@/constant/message.const'
import useSprintCurrent from '@/hooks/use-sprint-current'
import { formatDate } from '@/lib/utils'
import { SprintWorkspaceDataTable } from '@/types/sprint.type'
import { ColumnDef } from '@tanstack/react-table'

type SprintColumns = SprintWorkspaceDataTable

const { end, point, start, status, title } =
  messages.component.dataTable.sprint.columns
const { report } = messages.component.dataTable.project.columns
const columns: ColumnDef<SprintColumns>[] = [
  {
    accessorKey: 'title',
    header: title,
    size: 100,
    cell: ({ row }) => {
      const id: string = row.original.id
      const title: string = row.getValue('title')

      return <ToolTip trigger={<span>{title}</span>}>{id}</ToolTip>
    }
  },
  {
    accessorKey: 'storyPoint',
    header: point,
    size: 50,
    cell: ({ row }) => {
      const value: number = row.getValue('storyPoint')
      return <div>{value}</div>
    }
  },
  {
    accessorKey: 'status',
    header: status,
    cell: ({ row }) => {
      const id: string = row.original.id
      const start: Date = row.original.start
      const end: Date = row.original.end
      const {
        util: { getStatusSprint }
      } = useSprintCurrent()
      const status = getStatusSprint({
        id,
        start,
        end
      })
      return <BadgeSprint status={status} />
    }
  },

  {
    accessorKey: 'start',
    header: start,
    cell: ({ row }) => {
      const value: Date = row.getValue('start')
      return formatDate(value)
    }
  },

  {
    accessorKey: 'end',
    header: end,
    cell: ({ row }) => {
      const value: Date = row.getValue('end')
      return formatDate(value)
    }
  },
  {
    accessorKey: 'action',
    header: report,
    size: 10,
    cell: ({ row }) => {
      const sprintId: string = row.original.id
      return (
        <ReportColumnsAction
          sprint={{
            id: sprintId
          }}
        />
      )
    }
  }
]

export { columns }
export type { SprintColumns }
