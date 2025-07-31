import IssueStatusDoughnutChart from '@/components/dashboard/chart/IssueStatusDoughnutChart'
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
      {(_) => {
        return (
          <div className='grid grid-cols-2 gap-4'>
            {/* <ContainerDashboard className='flex-1'>
              <IssueTrendChart sprints={data} />
            </ContainerDashboard>
            <ContainerDashboard className='flex-1'>
              <IssueStatusTrendChart sprints={data} />
            </ContainerDashboard> */}
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
          </div>
        )
      }}
    </LoadingBoundary>
  )
}

export default SprintDashboardTab
