import { AlertDescription } from '@/components/ui/alert'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { getProjectPredictDisplayName } from '@/constant/message.const'
import { useGetResourcesQuery } from '@/feature/project/project.api'
import { cn, formatDate } from '@/lib/utils'
import dashboardService from '@/services/dashboard.service'
import { ProjectPredictRes } from '@/types/dashboard.type'
import { Id } from '@/types/other.type'
import { AlertCircleIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  projectId: Id
  sprintId: Id
}

const SprintStatus = ({ projectId, sprintId }: Props) => {
  const { data } = useGetResourcesQuery({
    projectId: projectId,
    sprintId: sprintId
  })

  const [predictData, setPredictData] = useState<ProjectPredictRes | null>(null)
  const lastTime = useMemo(() => {
    console.log('predictData', predictData)
    if (predictData?.lastTimeSecond) {
      return predictData.lastTimeSecond
    }
    if (predictData?.lastTime) {
      return predictData.lastTime
    }
    return null
  }, [predictData])

  useEffect(() => {
    dashboardService
      .getProjectPredictByProjectId(sprintId, projectId)
      .then((res) => {
        setPredictData(res)
      })
  }, [sprintId, projectId])
  const PredictStatus = useMemo(() => {
    return (
      <>
        <span
          className={cn(
            predictData?.predict === -2 && 'text-yellow-500',
            predictData?.predict === -1 && 'text-red-500',
            predictData?.predict === 0 && 'text-green-500'
          )}
        >
          Trạng thái dự đoán :{' '}
          {predictData &&
            getProjectPredictDisplayName(
              predictData.predictSecond === -2
                ? predictData.predict
                : predictData.predictSecond
            )}
        </span>

        <span>
          Dự đoán lần cuối vào {lastTime && formatDate(lastTime, 'LONG')}
        </span>
      </>
    )
  }, [predictData])

  const ResourceStatus = useMemo(() => {
    return (
      <div className='flex flex-col gap-2'>
        <span
          className={cn(data?.daily?.[0] ? 'text-green-500' : 'text-red-500')}
        >
          Báo cáo backlog 1: {data?.daily?.[0] ? 'đã nộp' : 'chưa nộp'}
        </span>
        <span
          className={cn(data?.daily?.[1] ? 'text-green-500' : 'text-red-500')}
        >
          Báo cáo backlog 2: {data?.daily?.[1] ? 'đã nộp' : 'chưa nộp'}
        </span>
        {PredictStatus}
      </div>
    )
  }, [data, predictData])

  return (
    <Popover defaultOpen={true}>
      <PopoverTrigger asChild>
        <AlertCircleIcon className='text-yellow-400' />
      </PopoverTrigger>
      <PopoverContent className='min-w-[300px]' align='end'>
        <h3 className='h3'>Cảnh báo Sprint!</h3>
        <AlertDescription>{ResourceStatus}</AlertDescription>
      </PopoverContent>
    </Popover>
  )
}

export default SprintStatus
