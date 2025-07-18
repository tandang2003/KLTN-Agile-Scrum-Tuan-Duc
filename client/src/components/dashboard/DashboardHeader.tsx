import ContainerDashboard from '@/components/dashboard/ContainerDashboard'
import DashboardFilter from '@/components/dashboard/DashboardFilter'
import Icon from '@/components/Icon'
type DashboardHeaderProps = {
  issueDone: number
  issueFailed: number
  issueCreated: number
}

const DashboardHeader = ({
  issueCreated,
  issueDone,
  issueFailed
}: DashboardHeaderProps) => {
  return (
    <div className='sticky top-0 right-0 left-0 flex gap-4 rounded-b-md bg-white pb-2'>
      <ContainerDashboard className='flex min-h-[80px] items-center gap-4'>
        <Icon
          icon={'mingcute:file-new-line'}
          className='rounded-md bg-blue-500 p-1 text-white'
          size={30}
        />
        <div>
          <span className='text-xl'>{issueCreated} issue đã tạo</span>
        </div>
      </ContainerDashboard>
      <ContainerDashboard className='flex min-h-[80px] items-center gap-4'>
        <Icon
          icon={'material-symbols:done'}
          className='rounded-md bg-green-500 p-1 text-white'
          size={30}
        />
        <span className='text-xl'>{issueDone} issue đã hoàn thành</span>
      </ContainerDashboard>
      <ContainerDashboard className='flex min-h-[80px] items-center gap-4'>
        <Icon
          icon={'material-symbols:assignment-late-outline'}
          className='rounded-md bg-red-500 p-1 text-white'
          size={30}
        />
        <span className='text-xl'>{issueFailed} Issue chưa hoàn thành</span>
      </ContainerDashboard>
      <ContainerDashboard>
        <DashboardFilter />
      </ContainerDashboard>
    </div>
  )
}

export default DashboardHeader
