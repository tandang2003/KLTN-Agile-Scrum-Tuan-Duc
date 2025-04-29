import { columns, ProjectColumn } from '@/components/datatable/project/Column'
import { DataTable } from '@/components/datatable/project/DataTable'
import { cn, uuid } from '@/lib/utils'
import React from 'react'

function getData(): ProjectColumn[] {
  // Fetch data from your API here.
  return Array(10)
    .fill(null)
    .map(() => ({
      id: uuid(),
      name: 'LE ANH DUC',
      leader: 'LE ANH DUC',
      currentSprint: 4,
      lastUpdated: new Date()
    }))
}

type ProjectTableProps = React.ComponentProps<'div'>

const ProjectTable = ({ className, ...props }: ProjectTableProps) => {
  return (
    <div className={cn(className)} {...props}>
      <DataTable columns={columns} data={getData()} />
    </div>
  )
}

export default ProjectTable
