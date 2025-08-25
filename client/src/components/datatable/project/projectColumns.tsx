import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import messages from '@/constant/message.const'
import useSprintOrder from '@/hooks/use-sprint-order'
import { formatDate } from '@/lib/utils'
import { ProjectWorkspaceDataTable } from '@/types/workspace.type'
import { ColumnDef } from '@tanstack/react-table'
import { NavLink } from 'react-router-dom'

type ProjectColumns = ProjectWorkspaceDataTable

const { createAt, name, id, completedSprints, isSuccess, totalEndedSprints } =
  messages.component.dataTable.project.columns

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
  // {
  //   accessorKey: 'totalEndedSprints',
  //   header: totalEndedSprints,
  //   size: 50,
  //   cell: ({ row }) => {
  //     const {
  //       utils: { getSize }
  //     } = useSprintOrder()
  //     const value = row.getValue('totalEndedSprints')
  //     return value + '/' + getSize()
  //   }
  // },
  {
    accessorKey: 'completedSprints',
    header: completedSprints,
    size: 50,
    cell: ({ row }) => {
      const {
        utils: { getSize }
      } = useSprintOrder()
      const value = row.getValue('completedSprints')
      return value + '/' + getSize()
    }
  },
  {
    accessorKey: 'isSuccess',
    header: isSuccess,
    size: 50,
    cell: ({ row }) => {
      const value: boolean = row.getValue('isSuccess')
      return value ? (
        <Badge className='bg-green-400'>Thành công</Badge>
      ) : (
        <Badge className='bg-red-400'>Không thành công</Badge>
      )
    }
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
