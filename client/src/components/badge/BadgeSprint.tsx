import Icon from '@/components/Icon'
import { Badge } from '@/components/ui/badge'
import { getSprintStatusDisplayName } from '@/constant/message.const'
import { cn } from '@/lib/utils'
import { SprintStatusType } from '@/types/model/typeOf'
type BadgeSprintProps = {
  status: SprintStatusType
  className?: string
}

const BadgeSprint = ({ status, className }: BadgeSprintProps) => {
  return (
    <Badge className={cn(className)} statusSprint={status}>
      {status === 'RUNNING' && <Icon icon={'solar:running-bold'} />}
      {status === 'PENDING' && <Icon icon={'material-symbols:pending'} />}
      {status === 'COMPLETE' && <Icon icon={'nrk:media-media-complete'} />}
      {getSprintStatusDisplayName(status)}
    </Badge>
  )
}

export default BadgeSprint
