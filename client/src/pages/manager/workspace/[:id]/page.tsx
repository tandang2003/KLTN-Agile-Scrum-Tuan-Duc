import { StudentDataTable } from '@/components/datatable/student/StudentDataTable'
import { useGetWorkspaceQuery } from '@/feature/workspace/workspace.api'
import { WorkspaceParams } from '@/types/route.type'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams<WorkspaceParams>()
  const navigate = useNavigate()
  const { data } = useGetWorkspaceQuery(workspaceId as string, {
    skip: !workspaceId
  })

  useEffect(() => {
    if (!workspaceId) {
      navigate('/404', { replace: true })
      return
    }
  }, [navigate, workspaceId])

  if (!workspaceId) return null
  if (!data) return null

  return (
    <div className='px-4'>
      <div className='mt-1 mb-4 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 text-gray-100'>
        <span className='text-sm'>#{data.id}</span>
        <div className='flex justify-between'>
          <span>
            <h1 className='h1'>
              Workspace: <strong>{data.name}</strong>
            </h1>
            <span>Description</span>
            <p className='text-md line-clamp-2 truncate'>
              {data.description ?? ''}
            </p>
          </span>
          <ul className='grid [grid-template-columns:auto_auto] grid-rows-3 place-items-baseline gap-2'>
            <span>Start</span>
            <span className='rounded-xl bg-green-500 px-4 py-2'>
              {formatDate(data.start)}
            </span>
            <span>Current </span>
            <span className='rounded-xl bg-amber-500 px-4 py-2'>
              {formatDate(new Date())}
            </span>
            <span>Start </span>
            <span className='rounded-xl bg-red-500 px-4 py-2'>
              {formatDate(data.end)}
            </span>
          </ul>
        </div>
      </div>
      <Tabs defaultValue='project'>
        <TabsList>
          <TabsTrigger value='project'>Project</TabsTrigger>
          <TabsTrigger value='student'>Student</TabsTrigger>
        </TabsList>
        <TabsContent value='student'>
          <StudentDataTable workspaceId={workspaceId} />
        </TabsContent>
        <TabsContent value='project'></TabsContent>
      </Tabs>
    </div>
  )
}

export default WorkspaceDetailPage
