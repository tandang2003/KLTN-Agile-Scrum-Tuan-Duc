import ToolTip from '@/components/Tooltip'
import { formatDate } from '@/lib/utils'
import { ProjectWorkspaceDataTable } from '@/types/workspace.type'
import { ColumnDef } from '@tanstack/react-table'
import { NavLink } from 'react-router-dom'

type ProjectColumns = ProjectWorkspaceDataTable

const columns: ColumnDef<ProjectColumns>[] = [
  {
    accessorKey: 'id',
    header: '#',
    size: 50,
    cell: ({ row }) => {
      const value: string = row.getValue('id')
      return (
        <ToolTip
          trigger={
            <NavLink
              to={`/manager/workspace/project/${value}`}
              className={'inline-block w-[50px] truncate'}
            >
              {value}
            </NavLink>
          }
        >
          <span>{value}</span>
        </ToolTip>
      )
    }
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'createdAt',
    header: 'Create at',
    cell: ({ row }) => {
      const value: Date = row.getValue('createdAt')
      return formatDate(value)
    }
  }
]

export type { ProjectColumns }
export { columns }
