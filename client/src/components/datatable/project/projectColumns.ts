import { formatDate } from '@/lib/utils'
import { ProjectWorkspaceDataTable } from '@/types/workspace.type'
import { ColumnDef } from '@tanstack/react-table'

type ProjectColumns = ProjectWorkspaceDataTable

const columns: ColumnDef<ProjectColumns>[] = [
  {
    accessorKey: 'id',
    header: '#',
    size: 100
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'createdAt',
    header: 'created at',
    cell: ({ row }) => {
      const value: Date = row.getValue('createdAt')
      return formatDate(value)
    }
  }
]

export type { ProjectColumns }
export { columns }
