import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { SprintWorkspaceDataTable } from '@/types/workspace.type'
import { ColumnDef } from '@tanstack/react-table'

type SprintColumns = SprintWorkspaceDataTable

const columns: ColumnDef<SprintColumns>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 100
  },
  {
    accessorKey: '',
    header: 'Status',
    cell: ({ row }) => {
      const start: Date = row.getValue('start')
      const end: Date = row.getValue('end')
      const current = new Date()
      if (current < start) {
        return <Badge>Pending</Badge>
      }
      if (current >= start) {
        return <Badge>Doing</Badge>
      }
      if (current <= end) {
        return <Badge>End</Badge>
      }
      return null
    }
  },
  {
    accessorKey: 'predict',
    header: 'Date predict',
    cell: ({ row }) => {
      const value: Date = row.getValue('predict')
      const current: Date = new Date()
      return (
        <div>
          {formatDate(value)}
          {current > value && <Icon className='ml-3' icon={'mynaui:check'} />}
        </div>
      )
    }
  },
  {
    accessorKey: 'start',
    header: 'Date start',
    cell: ({ row }) => {
      const value: Date = row.getValue('start')
      return formatDate(value)
    }
  },
  {
    accessorKey: 'end',
    header: 'Date end',
    cell: ({ row }) => {
      const value: Date = row.getValue('end')
      return formatDate(value)
    }
  }
]

export type { SprintColumns }
export { columns }
