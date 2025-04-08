import ProjectHeader from '@/components/project/ProjectHeader'
import ProjectNavigation from '@/pages/manager/project/navigation'
import { ProjectParams } from '@/types/route.type'
import { Outlet, useParams } from 'react-router-dom'

const ProjectPage = () => {
  const { id } = useParams<ProjectParams>()
  if (!id) {
    return null
  }
  return (
    <section className='h-full px-4'>
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
      <ProjectNavigation id={id} />
      <Outlet />
    </section>
  )
}

export default ProjectPage
