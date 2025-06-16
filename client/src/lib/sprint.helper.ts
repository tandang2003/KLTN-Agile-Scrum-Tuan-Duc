import { SprintStatusType } from '@/types/model/typeOf'
import { SprintResponse } from '@/types/sprint.type'
import { isAfter, isBefore } from 'date-fns'

const getStatusSprint = ({
  start,
  end
}: {
  start: Date
  end: Date
}): SprintStatusType => {
  const now = new Date()
  if (isBefore(now, start)) return 'PENDING'
  if (isAfter(now, end)) return 'COMPLETE'
  return 'RUNNING'
}

const sortSprintsByDateStart = (sprints: SprintResponse[]) =>
  [...sprints].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  )

export { getStatusSprint, sortSprintsByDateStart }
