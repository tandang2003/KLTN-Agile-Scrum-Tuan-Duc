import ToolTip from '@/components/Tooltip'
import messages from '@/constant/message.const'
import { formatDate } from '@/lib/utils'
import { ProjectWorkspaceDataTable } from '@/types/workspace.type'
import { ColumnDef } from '@tanstack/react-table'
import { NavLink } from 'react-router-dom'

type ProjectColumns = ProjectWorkspaceDataTable

const { createAt, name, id } = messages.component.dataTable.project.columns

const columns: ColumnDef<ProjectColumns>[] = [
  {
    accessorKey: 'id',
    header: id,
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
    header: name
  },
  {
    accessorKey: 'createdAt',
    header: createAt,
    cell: ({ row }) => {
      const value: Date = row.getValue('createdAt')
      return formatDate(value)
    }
  }
]

export type { ProjectColumns }
export { columns }
