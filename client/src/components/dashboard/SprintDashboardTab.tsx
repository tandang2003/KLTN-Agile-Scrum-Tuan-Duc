import IssueStatusTrendChart from '@/components/dashboard/chart/IssueStatusTrendChart'
import IssueStatusDoughnutChart from '@/components/dashboard/chart/IssueStatusDoughnutChart'
import IssueTrendChart from '@/components/dashboard/chart/IssueTrendChart'
import MultiWorkloadBarChart from '@/components/dashboard/chart/WorkloadBarChart'
import ContainerDashboard from '@/components/dashboard/ContainerDashboard'
import { useSprintDashboardDetailSheet } from '@/components/dashboard/SprintDashboardDetailSheet'
import LoadingBoundary from '@/components/LoadingBoundary'

import { useGetAggregateSprintQuery } from '@/feature/aggregate/aggregate.api'
import { SprintAggregateProcessType } from '@/types/aggregate.type'
import { Id } from '@/types/other.type'

type SprintDashboardTabProps = {}

const SprintDashboardTab = ({}: SprintDashboardTabProps) => {
  const {
    sprint: { id }
  } = useSprintDashboardDetailSheet()
  const { data, isFetching } = useGetAggregateSprintQuery(id as Id, {
    skip: !id
  })
  return (
    <LoadingBoundary<SprintAggregateProcessType>
      data={data}
      isLoading={isFetching}
    >
      {(data) => {
        return (
          <div className='grid grid-cols-2 gap-4'>
            <ContainerDashboard className='flex-1'>
              <IssueTrendChart sprints={data} />
            </ContainerDashboard>
            <ContainerDashboard className='flex-1'>
              <IssueStatusTrendChart sprints={data} />
            </ContainerDashboard>
            <ContainerDashboard className='grid flex-1 place-items-center'>
              <div className='grid size-[400px] place-items-center'>
                <IssueStatusDoughnutChart
                  data={{
                    TODO: 5,
                    INPROCESS: 3,
                    REVIEW: 2,
                    DONE: 10
                  }}
                />
              </div>
            </ContainerDashboard>
            <ContainerDashboard>
              <MultiWorkloadBarChart
                data={[
                  { assignee: 'Alice', total: 20, done: 15, failed: 5 },
                  { assignee: 'Bob', total: 10, done: 7, failed: 3 },
                  { assignee: 'Charlie', total: 12, done: 12, failed: 0 }
                ]}
              />
            </ContainerDashboard>
          </div>
        )
      }}
    </LoadingBoundary>
  )
}

export default SprintDashboardTab
