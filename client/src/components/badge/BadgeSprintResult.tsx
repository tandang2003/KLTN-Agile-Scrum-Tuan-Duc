import ToolTip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { getSprintResultDisplayName } from '@/constant/message.const'
import { cn, formatDate } from '@/lib/utils'
import { SprintPredictResult } from '@/types/sprint.type'
type BadgeSprintProps = {
  status: SprintPredictResult
  lastTime?: Date
  className?: string
}

const BadgeSprintResult = ({
  status,
  lastTime,
  className
}: BadgeSprintProps) => {
  if (status === -2)
    return (
      <Badge className={cn('text-md', className)} sprintPredictResult={status}>
        {getSprintResultDisplayName(status)}
      </Badge>
    )
  else {
    return (
      <ToolTip
        trigger={
          <Badge
            className={cn('text-md', className)}
            sprintPredictResult={status}
          >
            {getSprintResultDisplayName(status)}
          </Badge>
        }
      >
        {lastTime && formatDate(lastTime)}
      </ToolTip>
    )
  }
}

export default BadgeSprintResult
