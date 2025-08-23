import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ProjectDetailResponse } from '@/types/project.type'
import { AlertCircleIcon } from 'lucide-react'
import { ReactNode } from 'react'
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
        <h3 className='h3'>Thông tin Project</h3>
        <div className={'flex flex-col gap-2 text-black'}>
          <span>Số lượng sprint đã kết thúc: {data.totalEndedSprints}</span>
          <span>Số sprint thành công: {data.completedSprints}</span>
          <span>
            Project hiện tại được đánh giá là{' '}
            {data.isSuccess ? (
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

export default ProjectPredict
