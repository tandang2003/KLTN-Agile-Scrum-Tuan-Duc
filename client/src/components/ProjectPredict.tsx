import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import messages from '@/constant/message.const'
import { cn } from '@/lib/utils'
import aggregateService from '@/services/aggregate.service'
import { ProjectDetailResponse } from '@/types/project.type'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
type ProjectPredictProps = {
  data: ProjectDetailResponse
}

const ProjectPredict = ({ data }: ProjectPredictProps) => {
  return (
    <Popover defaultOpen={true}>
      <PopoverTrigger asChild>
        <Badge>
          <Icon icon={'material-symbols:online-prediction'} />
        </Badge>
      </PopoverTrigger>
      <PopoverContent className='w-[400px]' align='end'>
        <h3 className='h3'>Thông tin Dự án</h3>
        <div className={'flex flex-col gap-2 text-black'}>
          <span>
            Số lượng sprint đã kết thúc: {data.totalEndedSprints} /{' '}
            {data.sprints.length}
          </span>
          <span>
            Số sprint thành công: {data.completedSprints} /{' '}
            {data.sprints.length}
          </span>
          <span>
            Project hiện tại được đánh giá là{' '}
            {data ? (
              <Badge className='bg-green-400'>'thành công'</Badge>
            ) : (
              <Badge className='bg-red-400'>không thành công</Badge>
            )}
          </span>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const ProjectPredictInWorkspace = ({ data }: ProjectPredictProps) => {
  const [messagePredict, setMessagePredict] = useState<{
    code: number
    message: string
  }>({ code: 0, message: 'Đang chờ dự đoán' })
  const message = messages.component.sprintPredict

  const handlePredict = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const res = await aggregateService.createPredict(data.id)
      if (res.code === 400) {
        setMessagePredict({
          code: res.code,
          message: 'có khả năng không thành công'
        })
        return
      }
      if (res.code === 200) {
        setMessagePredict({
          code: res.code,
          message: 'có khả năng thành công'
        })
      } else {
        setMessagePredict({
          code: res.code,
          message: message.toast.failed
        })
      }
    } catch (err) {
      if (isAxiosError(err)) {
        setMessagePredict({
          code: err.response?.status || 500,
          message: err.message
        })
        return
      }
    }
  }

  useEffect(() => {
    handlePredict()
  }, [data.id])

  return (
    <div
      className={
        'flex flex-col gap-2 rounded-2xl border-1 px-4 py-2 text-black shadow-md'
      }
    >
      <span>
        Dự án hiện tại được đánh giá là{' '}
        <Badge
          className={cn(
            'text-md',
            messagePredict.code === 200 ? 'bg-green-400' : 'bg-red-400'
          )}
        >
          {messagePredict.message}
        </Badge>
      </span>
    </div>
  )
}
export { ProjectPredictInWorkspace }
export default ProjectPredict
