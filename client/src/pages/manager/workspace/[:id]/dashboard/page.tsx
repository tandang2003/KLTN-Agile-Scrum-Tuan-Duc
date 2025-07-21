import IssueStatusDoughnutChart from '@/components/dashboard/teacher/ProjectStatusDoughnutChart.teacher'
import DashboardHeader from '@/components/dashboard/teacher/DashboardHeader'
import TasksByStatusPerProjectBarChart from '@/components/dashboard/teacher/TasksByStatusPerProjectBarChart.teacher'
import ContainerDashboard from '@/components/dashboard/ContainerDashboard'
import TasksCompletedOverTime from '@/components/dashboard/teacher/TasksCompletedOverTime.teacher'
import TasksByStatusPerStudentBarChart from '@/components/dashboard/teacher/TasksByStatusPerStudentBarChart.teacher'
import { useMemo } from 'react'

const WorkspaceDashboardPage = () => {
  const dataTaskByStatusPerStudent = useMemo(() => {
    return [
      {
        assignee: { uniId: 'u1001', name: 'Alice Nguyen' },
        todo: 3,
        inProcess: 5,
        review: 2,
        done: 10
      },
      {
        assignee: { uniId: 'u1002', name: 'Bob Tran' },
        todo: 4,
        inProcess: 3,
        review: 1,
        done: 8
      },
      {
        assignee: { uniId: 'u1003', name: 'Charlie Le' },
        todo: 2,
        inProcess: 4,
        review: 3,
        done: 12
      },
      {
        assignee: { uniId: 'u1004', name: 'Diana Hoang' },
        todo: 5,
        inProcess: 2,
        review: 0,
        done: 7
      },
      {
        assignee: { uniId: 'u1005', name: 'Ethan Pham' },
        todo: 1,
        inProcess: 6,
        review: 2,
        done: 11
      },
      {
        assignee: { uniId: 'u1005', name: 'Ethan Pham' },
        todo: 1,
        inProcess: 6,
        review: 2,
        done: 11
      },
      {
        assignee: { uniId: 'u1005', name: 'Ethan Pham' },
        todo: 1,
        inProcess: 6,
        review: 2,
        done: 11
      }
    ]
  }, [])
  const dataTasksByStatusPerProjectBarChart = useMemo(() => {
    return [
      {
        id: 'proj-1',
        name: 'AI Learning Platform',
        status: {
          todo: 5,
          inProcess: 8,
          review: 3,
          done: 12
        }
      },
      {
        id: 'proj-2',
        name: 'Mobile App Redesign',
        status: {
          todo: 3,
          inProcess: 4,
          review: 2,
          done: 10
        }
      },
      {
        id: 'proj-3',
        name: 'Web Dashboard',
        status: {
          todo: 7,
          inProcess: 5,
          review: 4,
          done: 6
        }
      },
      {
        id: 'proj-4',
        name: 'API Integration',
        status: {
          todo: 2,
          inProcess: 3,
          review: 1,
          done: 7
        }
      }
    ]
  }, [])
  return (
    <section className='relative'>
      <DashboardHeader
        issueCreated={10}
        issueDone={9}
        issueFailed={1}
        projects={4}
        avgNumber={3}
      />
      <div className='mt-4 flex basis-[500px] gap-4'>
        <ContainerDashboard>
          <IssueStatusDoughnutChart
            data={{
              DONE: 9,
              INPROCESS: 0,
              REVIEW: 0,
              TODO: 1
            }}
            width='500'
            height='500'
          />
        </ContainerDashboard>
        <ContainerDashboard className={'flex-1'}>
          <TasksByStatusPerProjectBarChart
            data={dataTasksByStatusPerProjectBarChart}
          />
        </ContainerDashboard>
      </div>
      <ContainerDashboard className='mt-2'>
        <TasksByStatusPerStudentBarChart data={dataTaskByStatusPerStudent} />
      </ContainerDashboard>

      <ContainerDashboard className={'mt-2'}>
        <TasksCompletedOverTime />
      </ContainerDashboard>
    </section>
  )
}

export default WorkspaceDashboardPage
