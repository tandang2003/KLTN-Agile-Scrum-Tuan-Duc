import { columns, ProjectColumn } from '@/components/datatable/project/Column'
import { DataTable } from '@/components/datatable/project/DataTable'
import { uuid } from '@/lib/utils'

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

const PageDemo = () => {
  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={getData()} />
    </div>
  )
}

export default PageDemo
