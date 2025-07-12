import IssueStatusChart from '@/components/dashboard/chart/IssueStatusChart'
import IssueTrendChart from '@/components/dashboard/chart/IssueTrendChart'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { SprintAggregateType } from '@/types/aggregate.type'
import { useMemo } from 'react'
type SprintDashboardDetailProps = {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const SprintDashboardDetailSheet = ({
  isOpen,
  onOpenChange
}: SprintDashboardDetailProps) => {
  const sprintData: SprintAggregateType[] = useMemo(() => {
    return [
      {
        id: '30%',
        duration: 10,
        issuesStarted: 10,
        issuesAdded: 5,
        issuesRemoved: 2,
        issuesTodo: 3,
        issuesInProgress: 5,
        issueDone: 2,
        members: 4
      },
      {
        id: '50%',
        duration: 12,
        issuesStarted: 8,
        issuesAdded: 6,
        issuesRemoved: 1,
        issuesTodo: 4,
        issuesInProgress: 3,
        issueDone: 3,
        members: 5
      },
      {
        id: '80%',
        duration: 12,
        issuesStarted: 8,
        issuesAdded: 6,
        issuesRemoved: 1,
        issuesTodo: 4,
        issuesInProgress: 3,
        issueDone: 3,
        members: 5
      }
    ]
  }, [])
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className='min-w-[90vw]'>
        <SheetHeader>
          <SheetTitle className='h1'>Thống kê</SheetTitle>

          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ScrollArea className='h-full pb-[100px]'>
          <SprintAggregateByProcess process={25} data={sprintData[0]} />
          <IssueTrendChart sprints={sprintData} />
          <IssueStatusChart sprints={sprintData} />
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
        <SheetFooter className='mt-3'>
          <div className='flex w-full items-center justify-between'>
            <SheetClose asChild>
              <Button className='cancel' variant='outline'>
                Đóng
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

type SprintAggregateByProcessProps = {
  process: number
  data: SprintAggregateType
}

const SprintAggregateByProcess = ({
  process,
  data
}: SprintAggregateByProcessProps) => {
  return (
    <section>
      <h3 className='h3'>Giai đoạn {process}%</h3>
      <div className='[&> div]:border-b [&> div]:border-gray-200 [&> div]:py-2 even mt-4 grid flex-1 grid-cols-2 gap-4 [&>div:nth-child(odd)]:bg-gray-50'>
        <div>Thời gian chạy sprint</div>
        <div>{data.duration}</div>
        <div>Số lượng issue bắt đầu</div>
        <div>{data.issuesStarted}</div>
        <div>Số lượng issue được thêm vào</div>
        <div>{data.issuesAdded}</div>
        <div>Số lượng issue bị loại bỏ</div>
        <div>{data.issuesRemoved}</div>
        <div>Số lượng issue ở trạng thái todo</div>
        <div>{data.issuesTodo}</div>
        <div>Số lượng issue ở trạng thái in progress</div>
        <div>{data.issuesInProgress}</div>
        <div>Số lượng thành viên</div>
        <div>{data.members}</div>
      </div>
    </section>
  )
}

export default SprintDashboardDetailSheet
