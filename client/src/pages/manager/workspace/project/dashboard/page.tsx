import IssuePriorityBarChart from '@/components/dashboard/chart/IssuePriorityBarChart'
import IssueStatusDoughnutChart from '@/components/dashboard/chart/IssueStatusDoughnutChart'
import WorkloadBarChart from '@/components/dashboard/chart/WorkloadBarChart'
import ContainerDashboard from '@/components/dashboard/ContainerDashboard'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import SprintCollection from '@/components/dashboard/SprintCollection'
import LoadingBoundary from '@/components/LoadingBoundary'
import { useGetDashboardProjectQuery } from '@/feature/dashboard/dashboard.api'
import useAppId from '@/hooks/use-app-id'
import { ProjectDashBoardProvider } from '@/pages/manager/workspace/project/dashboard/context'
import { DashboardRes } from '@/types/dashboard.type'
import { Id } from '@/types/other.type'
import { useState } from 'react'

const ProjectDashBoard = () => {
  const { projectId } = useAppId()
  const [sprint, setSprint] = useState<{
    id?: Id
  }>({})

  const { data, isFetching } = useGetDashboardProjectQuery(
    {
      projectId: projectId as Id,
      sprintId: sprint.id
    },
    {
      skip: !projectId
    }
  )

  return (
    <section className='relative'>
      <ProjectDashBoardProvider
        value={{
          sprint: sprint,
          setSprint: setSprint
        }}
      >
        <LoadingBoundary<DashboardRes> loading={isFetching} data={data}>
          {(data) => (
            <>
              <DashboardHeader
                issueCreated={data.issueCreated}
                issueDone={data.issueDone}
                issueFailed={data.issueFailed}
              />
              <div className='mt-4 flex gap-4'>
                <ContainerDashboard>
                  <IssueStatusDoughnutChart
                    data={data.status}
                    width='500'
                    height='500'
                  />
                </ContainerDashboard>
                <ContainerDashboard className={'flex-1'}>
                  <WorkloadBarChart
                    data={
                      data.workload.map((item) => ({
                        ...item,
                        assignee: item.assignee || 'Unassigned'
                      })) || []
                    }
                  />
                </ContainerDashboard>
              </div>

              <ContainerDashboard className={'mt-4'}>
                <IssuePriorityBarChart data={data.priority} />
              </ContainerDashboard>
              <div className='mt-3'>
                <SprintCollection />
              </div>
            </>
          )}
        </LoadingBoundary>
      </ProjectDashBoardProvider>
    </section>
  )
}

export default ProjectDashBoard
