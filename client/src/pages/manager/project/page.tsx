import ProjectHeader from '@/components/project/ProjectHeader'
import ProjectNavigation from '@/pages/manager/project/navigation'
import { Outlet } from 'react-router-dom'

const ProjectPage = () => {
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
      <ProjectNavigation />
      <Outlet />
    </section>
  )
}

export default ProjectPage
