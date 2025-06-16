import SprintColumnsAction from '@/components/datatable/sprint/sprintColumnsAction'
import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { getStatusSprint } from '@/lib/sprint.helper'
import { formatDate } from '@/lib/utils'
import { SprintWorkspaceDataTable } from '@/types/sprint.type'
import { ColumnDef } from '@tanstack/react-table'

type SprintColumns = SprintWorkspaceDataTable

const columns: ColumnDef<SprintColumns>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    size: 100
  },
  {
    accessorKey: 'storyPoint',
    header: 'Point',
    size: 50,
    cell: ({ row }) => {
      const value: number = row.getValue('storyPoint')
      return <div>{value}</div>
    }
  },
  {
    accessorKey: '',
    header: 'Status',
    cell: ({ row }) => {
      const start: Date = row.getValue('start')
      const end: Date = row.getValue('end')
      return (
        <Badge
          statusSprint={getStatusSprint({
            start,
            end
          })}
        >
          {getStatusSprint({ start, end })}
        </Badge>
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
    accessorKey: 'end',
    header: 'Date end',
    cell: ({ row }) => {
      const value: Date = row.getValue('end')
      return formatDate(value)
    }
  },
  {
    accessorKey: 'action',
    header: '',
    size: 10,
    cell: ({ row }) => {
      return <SprintColumnsAction />
    }
  }
]

export type { SprintColumns }
export { columns }
