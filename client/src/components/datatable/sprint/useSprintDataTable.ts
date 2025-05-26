import { columns } from '@/components/datatable/sprint/sprintColumns'
import { useGetListSprintQuery } from '@/feature/sprint/sprint.api'
import { Id } from '@/types/other.type'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

export const useSprintTable = (workspaceId: Id) => {
  const { data, isFetching } = useGetListSprintQuery(workspaceId, {
    skip: !workspaceId
  })

  const table = useReactTable({
    data: data || [],
    columns: columns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,

    getCoreRowModel: getCoreRowModel()
  })

  return { table, isFetching }
}
