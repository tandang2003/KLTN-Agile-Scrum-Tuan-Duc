import messages, { getRoleDisplayName } from '@/constant/message.const'
import { RoleType } from '@/types/auth.type'
import { StudentWorkspaceDataTable } from '@/types/workspace.type'
import { ColumnDef } from '@tanstack/react-table'

type StudentColumns = StudentWorkspaceDataTable

const { name, role, uniId } = messages.component.dataTable.user.columns

const columns: ColumnDef<StudentColumns>[] = [
  {
    accessorKey: 'uniId',
    header: uniId
  },
  {
    accessorKey: 'name',
    header: name
  },

  {
    accessorKey: 'role',
    header: role,
    cell: ({ row }) => {
      const role = row.getValue('role') as RoleType
      return <span className='capitalize'>{getRoleDisplayName(role)}</span>
    }
  }
]

export type { StudentColumns }
export { columns }
