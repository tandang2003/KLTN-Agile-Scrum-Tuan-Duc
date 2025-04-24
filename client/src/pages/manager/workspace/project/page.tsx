import ProjectHeader from '@/components/project/ProjectHeader'
import SectionContainer from '@/components/wrapper/SectionContainer'
import ProjectNavigation from '@/pages/manager/workspace/project/navigation'
import { ProjectParams } from '@/types/route.type'
import { Outlet, useParams } from 'react-router-dom'

const ProjectPage = () => {
  const { projectId } = useParams<ProjectParams>()
  if (!projectId) {
    return null
  }
  return (
    <SectionContainer>
      <ProjectHeader
        className='pb-4'
        name='Project 1'
        breadcrumbs={[
          {
            name: 'Home',
            href: '/'
          },
          {
            name: 'Project'
          }
        ]}
      />
      <ProjectNavigation id={projectId} />
      <Outlet />
    </SectionContainer>
  )
}

export default ProjectPage
