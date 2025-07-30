import ContainerDashboard from '@/components/dashboard/ContainerDashboard'
import DashboardFilter from '@/components/dashboard/teacher/DashboardFilter.teacher'
import Icon from '@/components/Icon'
import LoadingBoundary from '@/components/LoadingBoundary'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetDashboardWorkspaceQuery } from '@/feature/dashboard/dashboard.api'
import useAppId from '@/hooks/use-app-id'
import { useProjectDashBoard } from '@/pages/manager/workspace/[id]/dashboard/context'
import { DashboardWorkspaceResponse } from '@/types/dashboard.type'
import { Id } from '@/types/other.type'
type DashboardHeaderProps = {}

const DashboardHeader = ({}: DashboardHeaderProps) => {
  const { workspaceId } = useAppId()
  const { sprint } = useProjectDashBoard()
  const { data, isFetching } = useGetDashboardWorkspaceQuery(
    {
      workspaceId: workspaceId as Id,
      sprintId: sprint.id
    },
    {
      skip: !workspaceId
    }
  )

  return (
    <div className='sticky top-0 right-0 left-0 flex gap-4 rounded-b-md bg-white pb-2'>
      <LoadingBoundary<DashboardWorkspaceResponse>
        data={data}
        isLoading={isFetching}
        loading={<Skeleton className='h-[100px] w-full' />}
      >
        {(data) => (
          <>
            <ContainerDashboard className='flex min-h-[80px] items-center gap-4'>
              <Icon
                icon={'mingcute:file-new-line'}
                className='rounded-md bg-blue-500 p-1 text-white'
                size={30}
              />
              <div>
                <span className='text-xl'>
                  {Math.floor(data.taskFinishRate)} issue đã tạo
                </span>
              </div>
            </ContainerDashboard>
            <ContainerDashboard className='flex min-h-[80px] items-center gap-4'>
              <Icon
                icon={'material-symbols:done'}
                className='rounded-md bg-green-500 p-1 text-white'
                size={30}
              />
              <span className='text-xl'>
                {data.assigneeRate.toFixed(2)}% issue được gán
              </span>
            </ContainerDashboard>

            <ContainerDashboard className='flex min-h-[80px] items-center gap-4'>
              <Icon
                icon={'ant-design:project-filled'}
                className='rounded-md bg-blue-500 p-1 text-white'
                size={30}
              />
              <span className='text-xl'>{data.numOfProject} Nhóm</span>
            </ContainerDashboard>
            <ContainerDashboard className='flex min-h-[80px] items-center gap-4'>
              <Icon
                icon={'tdesign:member'}
                className='rounded-md bg-blue-500 p-1 text-white'
                size={30}
              />
              <span className='text-xl'>
                Thành viên mỗi nhóm:{' '}
                {Math.floor((data.maxNumMember + data.minNumMember) / 2)}{' '}
              </span>
            </ContainerDashboard>
            <ContainerDashboard>
              <DashboardFilter />
            </ContainerDashboard>
          </>
        )}
      </LoadingBoundary>
    </div>
  )
}

export default DashboardHeader
