import DialogUpdateIssue from '@/components/issue/DialogUpdateIssue'
import LoadingBoundary from '@/components/LoadingBoundary'
import { Skeleton } from '@/components/ui/skeleton'
import SectionContainer from '@/components/wrapper/SectionContainer'
import { useAppDispatch, useAppSelector } from '@/context/redux/hook'
import { useGetProjectQuery } from '@/feature/project/project.api'
import { disableUpdateIssue } from '@/feature/trigger/trigger.slice'
import ProjectNavigation from '@/pages/manager/workspace/project/navigation'
import { Id } from '@/types/other.type'
import { ProjectResponse } from '@/types/project.type'
import { ProjectParams } from '@/types/route.type'
import { Outlet, useParams } from 'react-router-dom'

const ProjectPage = () => {
  const { projectId } = useParams<ProjectParams>()
  const { isFetching, data } = useGetProjectQuery(projectId as Id, {
    skip: !projectId
  })
  const isUpdateIssue = useAppSelector(
    (state) => state.triggerSlice.isUpdateIssue
  )
  const dispatch = useAppDispatch()

  return (
    <SectionContainer className='flex flex-col'>
      <DialogUpdateIssue />
      <LoadingBoundary<ProjectResponse>
        fallback={''}
        data={data}
        isLoading={isFetching}
        loading={<Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      >
        {(data) => (
          <>
            <div className='rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 pb-2 text-white'>
              <span className='text-sm'>{data.id}</span>
              <h2 className='h2'>{data.name}</h2>
            </div>

            <div className='pt-2 pb-4'>
              <ProjectNavigation id={data.id} />
            </div>
            <Outlet />
          </>
        )}
      </LoadingBoundary>
      <DialogUpdateIssue />
    </SectionContainer>
  )
}

export default ProjectPage
