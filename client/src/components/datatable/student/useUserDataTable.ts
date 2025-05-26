import { columns } from '@/components/datatable/student/userColumns'
import { useGetListStudentWorkspaceQuery } from '@/feature/workspace/workspace.api'
import { Id } from '@/types/other.type'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

export const useUserTable = (workspaceId: Id) => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [globalFilter, setGlobalFilter] = useState('')

  const { data, isFetching } = useGetListStudentWorkspaceQuery({
    id: workspaceId,
    page: {
      page: pageIndex,
      size: pageSize
    }
  })

  const table = useReactTable({
    data: data?.items || [],
    columns: columns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: data?.totalPages ?? -1,
    state: {
      pagination: { pageIndex, pageSize },
      globalFilter
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater
      setPageIndex(next.pageIndex)
      setPageSize(next.pageSize)
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel()
  })

  return { table, isFetching, globalFilter, setGlobalFilter }
}
