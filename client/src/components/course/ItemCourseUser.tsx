import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { UserCourseResponseType } from '@/types/course.type'

type CourseItemProps = {
  data: UserCourseResponseType
}

const CourseUserItem = ({ data }: CourseItemProps) => {
  return (
    <div className='flex items-center justify-between rounded-md border-2 border-gray-200 p-4'>
      <div>{data.course.name}</div>
      <div className='flex items-center gap-2'>
        <span>Điểm</span>
        <Badge
          className={cn(
            'text-xs',
            data.point >= 5
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          )}
        >
          {data.point}
        </Badge>
      </div>
    </div>
  )
}

export default CourseUserItem
