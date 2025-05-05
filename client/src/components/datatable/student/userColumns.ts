import { StudentWorkspaceDataTable } from '@/types/workspace.type'
import { ColumnDef } from '@tanstack/react-table'

type StudentColumns = StudentWorkspaceDataTable

const columns: ColumnDef<StudentColumns>[] = [
  {
    accessorKey: 'uniId',
    header: '#'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'className',
    header: 'Class'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  }
]

export type { StudentColumns }
export { columns }
