import ContainerDashboard from '@/components/dashboard/ContainerDashboard'
import DashboardHeader from '@/components/dashboard/teacher/DashboardHeader'
import TasksByStatusPerProjectBarChart from '@/components/dashboard/teacher/TasksByStatusPerProjectBarChart.teacher'
import TasksByStatusPerStudentBarChart from '@/components/dashboard/teacher/TasksByStatusPerStudentBarChart.teacher'
import { ProjectDashBoardProvider } from '@/pages/manager/workspace/[id]/dashboard/context'
import { Id } from '@/types/other.type'
import { useState } from 'react'

const WorkspaceDashboardPage = () => {
  const [sprint, setSprint] = useState<{
    id?: Id
  }>({})

  return (
    <section className='relative'>
      <ProjectDashBoardProvider
        value={{
          sprint: sprint,
          setSprint: setSprint
        }}
      >
        <DashboardHeader />

        <ContainerDashboard className={'mt-2'}>
          <TasksByStatusPerStudentBarChart />
        </ContainerDashboard>
        <ContainerDashboard className='mt-2'>
          <TasksByStatusPerProjectBarChart />
        </ContainerDashboard>
      </ProjectDashBoardProvider>
    </section>
  )
}

export default WorkspaceDashboardPage
