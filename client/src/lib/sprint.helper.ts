import { store } from '@/context/redux/store'
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
  const currentSprint = store.getState().sprintSlice.current
  if (!currentSprint) {
    throw new Error('Start and end dates must be provided')
  }
  const startCurrentSprint = new Date(currentSprint.start)
  const endCurrentSprint = new Date(currentSprint.end)

  if (isBefore(startCurrentSprint, start)) return 'PENDING'
  if (isAfter(endCurrentSprint, end)) return 'COMPLETE'
  return 'RUNNING'
}

const sortSprintsByDateStart = (sprints: SprintResponse[]) =>
  [...sprints].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  )

export { getStatusSprint, sortSprintsByDateStart }
