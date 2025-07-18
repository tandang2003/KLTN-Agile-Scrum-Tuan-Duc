import IssuePriorityBarChart from '@/components/dashboard/chart/IssuePriorityBarChart'
import IssueStatusTrendChart from '@/components/dashboard/chart/IssueStatusTrendChart'
import IssueStatusDoughnutChart from '@/components/dashboard/chart/IssueStatusDoughnutChart'
import IssueTrendChart from '@/components/dashboard/chart/IssueTrendChart'
import WorkloadBarChart from '@/components/dashboard/chart/WorkloadBarChart'
import ContainerDashboard from '@/components/dashboard/ContainerDashboard'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import SprintCollection from '@/components/dashboard/SprintCollection'
import LoadingBoundary from '@/components/LoadingBoundary'
import { useGetDashboardQuery } from '@/feature/dashboard/dashboard.api'
import useAppId from '@/hooks/use-app-id'
import { ProjectDashBoardProvider } from '@/pages/manager/workspace/project/dashboard/context'
import { DashboardRes } from '@/types/dashboard.type'
import { Id } from '@/types/other.type'
import { useState } from 'react'
import messages from '@/constant/message.const'
import HeadingDashboard from '@/components/dashboard/HeadingDashboard'

const ProjectDashBoard = () => {
  const { projectId } = useAppId()
  const [sprint, setSprint] = useState<{
    id?: Id
  }>({})
  const issueStatus = messages.component.dashboard.chart.issueStatus
  const issueTrend = messages.component.dashboard.chart.issueTrend
  const notData = messages.other.notData
  const { data, isFetching } = useGetDashboardQuery(
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
              <div className='mt-4 flex gap-4'>
                <ContainerDashboard className='flex-1'>
                  <HeadingDashboard>{issueTrend.title}</HeadingDashboard>

                  <LoadingBoundary
                    loading={isFetching}
                    data={data.issueTrend}
                    fallback={<div className='text-center'> {notData}</div>}
                  >
                    {(data) => <IssueTrendChart data={data} />}
                  </LoadingBoundary>
                </ContainerDashboard>
                <ContainerDashboard className={'flex-1'}>
                  <HeadingDashboard>{issueStatus.title}</HeadingDashboard>
                  <LoadingBoundary
                    loading={isFetching}
                    data={data.issueStatusTrend}
                    fallback={<div className='text-center'> {notData}</div>}
                  >
                    {(data) => <IssueStatusTrendChart data={data} />}
                  </LoadingBoundary>
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
