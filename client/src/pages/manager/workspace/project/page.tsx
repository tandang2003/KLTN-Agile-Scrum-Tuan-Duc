import { Skeleton } from '@/components/ui/skeleton'
import SectionContainer from '@/components/wrapper/SectionContainer'
import { useGetProjectQuery } from '@/feature/project/project.api'
import ProjectNavigation from '@/pages/manager/workspace/project/navigation'
import { Id } from '@/types/other.type'
import { ProjectParams } from '@/types/route.type'
import { Outlet, useParams } from 'react-router-dom'

const ProjectPage = () => {
  const { projectId } = useParams<ProjectParams>()
  const { isFetching, data } = useGetProjectQuery(projectId as Id, {
    skip: !projectId
  })
  return (
    <SectionContainer>
      {isFetching && <Skeleton className={'h-4/5 rounded-xl bg-red-400'} />}
      {!isFetching && data && (
        <>
          <h2 className='h2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 pb-2 text-white'>
            {data.name}
          </h2>
          <ProjectNavigation id={data.id} />
          <Outlet />
        </>
      )}
    </SectionContainer>
  )
}

export default ProjectPage
