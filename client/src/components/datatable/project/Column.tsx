import { Id } from '@/types/other.type'
import { ColumnDef } from '@tanstack/react-table'

export type ProjectColumn = {
  id: Id
  name: string
  leader: string
  currentSprint: number
  lastUpdated: Date
}

export const columns: ColumnDef<ProjectColumn>[] = [
  {
    accessorKey: 'id',
    header: 'Id'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'currentSprint',
    header: 'Sprint'
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated'
  }
]
