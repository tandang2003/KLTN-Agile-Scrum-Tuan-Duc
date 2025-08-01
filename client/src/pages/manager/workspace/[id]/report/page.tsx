import { ReportByProjectDataTable } from '@/components/datatable/report/project/ProjectDataTable'
import ReportBySprintDataTable from '@/components/datatable/report/sprint/SprintDataTable'
import LoadingBoundary from '@/components/LoadingBoundary'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import useAppId from '@/hooks/use-app-id'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const WorkspaceReportPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)
  const rawType = query.get('type')
  const isValidType = ['project', 'sprint'].includes(rawType ?? '')
  const type = isValidType ? rawType : 'project'

  // 🔁 Rewrite URL if invalid or missing
  useEffect(() => {
    if (!isValidType) {
      query.set('type', 'project')
      navigate(
        {
          pathname: location.pathname,
          search: query.toString()
        },
        { replace: true }
      ) // replace to avoid pushing history
    }
  }, [isValidType, location.pathname, navigate])

  const handleChange = (newType: string) => {
    query.set('type', newType)
    navigate({
      pathname: location.pathname,
      search: query.toString()
    })
  }

  const { workspaceId } = useAppId()

  return (
    <div>
      <Select defaultValue={type as string} onValueChange={handleChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Hiển thị theo' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='project'>Hiển thị theo project</SelectItem>
          <SelectItem value='sprint'>Hiển thị theo sprint</SelectItem>
        </SelectContent>
      </Select>
      <div className='mt-2'>
        <LoadingBoundary data={workspaceId} fallback='Workspace not found'>
          {(workspaceId) =>
            type === 'project' ? (
              <ReportByProjectDataTable workspaceId={workspaceId} />
            ) : (
              <ReportBySprintDataTable workspaceId={workspaceId} />
            )
          }
        </LoadingBoundary>
      </div>
    </div>
  )
}

export default WorkspaceReportPage
